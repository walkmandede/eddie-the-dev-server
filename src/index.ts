import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { apiLogger } from "./middleware/apiLogger.ts";
import pool, { initDatabase } from "./config/db.ts";

import aboutMeRoutes from "./routes/aboutMe.route.ts";
import educationRoutes from "./routes/education.route.ts";
import experienceRoutes from "./routes/experience.route.ts";
import projectRoutes from "./routes/project.route.ts";
import skillRoutes from "./routes/skill.route.ts";

//variables
const app = express();
const apiPrefix = process.env.API_VERSION;
const isProduction = process.env.NODE_ENV === "production";
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(apiLogger);


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

app.use(`${apiPrefix}/aboutMe`, aboutMeRoutes);
app.use(`${apiPrefix}/education`, educationRoutes);
app.use(`${apiPrefix}/experience`, experienceRoutes);
app.use(`${apiPrefix}/project`, projectRoutes);
app.use(`${apiPrefix}/skill`, skillRoutes);


//server
app.listen(PORT, async() => {
  try{
    await initDatabase();
    if(isProduction){
      startHealthCheck();
    }    
    const baseUrl = `http://${HOST}:${PORT}`;
    console.log(`Server running at ${baseUrl}`);
    console.log(`API running at ${baseUrl}${apiPrefix}`);
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
      console.log('Health check:', data.status ? 'Healthy' : 'Something went wrong!', new Date().toISOString());
    } catch (error) {
      console.error('Health check failed:', error);
    }
  }, 12*60*1000); // 60000ms = 1 minute
}