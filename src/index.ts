import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import pool from "./config/db.ts";
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
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
