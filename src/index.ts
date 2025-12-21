import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import pool, { initDatabase } from "./config/db.ts";
import experienceRoutes from "./routes/experience.route.ts";


const app = express();
const apiPrefix = process.env.API_VERSION;


//middlewares
app.use(cors());
app.use(express.json());

//apis
app.get(`${apiPrefix}/health`, async (req: Request, res: Response) => {
  try {
    
    const result = await pool.query('SELECT NOW()');
    res.send({ 
      status: true, 
      message: "Database is connected", 
      db_time: result.rows
    });
  } catch (err) {
    console.error("Database health check failed:", err);
    res.status(500).send({ status: false, error: "Database connection failed" });
  }
});

app.use(`${apiPrefix}/experience`, experienceRoutes);


//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
  try{
    console.log(`Server initiating`);
    await initDatabase();
    console.log(`Server running`);
    startHealthCheck();
  }
  catch(error){
    console.error('Failed to start: ',error);
    process.exit(1);
  }

});


function startHealthCheck() {
  const healthCheckUrl = `https://eddie-the-dev-server.onrender.com/api/v1/health`;
  
  setInterval(async () => {
    try {
      const response = await fetch(healthCheckUrl);
      const data = await response.json();
      console.log('Health check:', data.status ? '✓' : '✗', new Date().toISOString());
    } catch (error) {
      console.error('Health check failed:', error);
    }
  }, 12*60*1000); // 60000ms = 1 minute
}