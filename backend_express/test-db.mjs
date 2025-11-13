import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'fullstack',
  password: 'postgres',
  port: 5432
});

async function test() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Postgres OK:', res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

test();
