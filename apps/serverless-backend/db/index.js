const dotenv = require("dotenv");
const pg = require("pg");

dotenv.config();
const { Pool } = pg;

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = { pgPool };
