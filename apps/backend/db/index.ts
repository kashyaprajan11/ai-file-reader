require("dotenv").config();
const { Pool } = require("pg");

console.log("db url", process.env.DATABASE_URL);

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports =  pgPool 
