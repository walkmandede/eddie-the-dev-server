import pg from 'pg';

const { Pool } = pg;


const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  max: 20,           
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Log pool errors to prevent server crashes
pool.on('error', (err: any) => {
  console.error('Unexpected error on idle database client', err);
  process.exit(-1);
});

export default pool;
