import { Pool } from 'pg';

declare global {
  var postgresPool: Pool | undefined;
}

let pool: Pool;

if (!global.postgresPool) {
  global.postgresPool = new Pool({
    connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
  });
}

pool = global.postgresPool;

export default pool;
