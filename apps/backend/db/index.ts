import * as dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pgPool;
