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
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,           
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});


pool.on('error', (err: any) => {
  console.error('Unexpected error on idle database client', err);
  process.exit(-1);
});


async function initDatabase() {
  try {
    const sqlPath = path.join(__dirname, '../../database/init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await pool.query(sql);
    console.log('Database initialized');
  } catch (err) {
    console.error('Database initialization failed:', err);
    throw err;
  }
}


initDatabase().catch(console.error);

export { initDatabase };
export default pool;