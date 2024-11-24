import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export { pgPool };
