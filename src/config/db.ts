import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,           
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});


pool.on('error', (err: any) => {
  console.error('Unexpected error on idle database client', err);
  process.exit(-1);
});


async function initDatabase(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {

      await pool.query('SELECT NOW()');
      console.log('Database connection established');
      
      const sqlPath = path.join(__dirname, '../../database/init.sql');
      const sql = fs.readFileSync(sqlPath, 'utf8');
      await pool.query(sql);
      console.log('Database initialized');
      return;
    } catch (err) {
      console.log(`Database initialization attempt ${i + 1}/${retries} failed. Retrying in ${delay/1000}s...`);
      if (i === retries - 1) {
        console.error('atabase initialization failed after all retries:', err);
        throw err;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

export {initDatabase};
export default pool;