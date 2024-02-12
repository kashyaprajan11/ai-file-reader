import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT: Number = Number(process.env.PORT);

// Handling GET / Request
app.get("/", (req, res) => {
  res.send("Welcome to typescript backend!");
});

// Server setup
app.listen(PORT, () => {
  console.log(
    "The application is listening " + "on port http://localhost:" + PORT
  );
});
