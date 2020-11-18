const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DEV_DATABASE,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false }
});

pool.on('connect', () => console.log('Postgres connected'));

module.exports = pool;
