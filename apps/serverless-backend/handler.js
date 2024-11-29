const serverless = require("serverless-http");
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth.js");
const githubRoutes = require("./routes/github.js");
const chatRoutes = require("./routes/chat.js");

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(helmet());
app.disable("x-powered-by");
app.use(morgan("tiny"));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/github", githubRoutes);
app.use("/chat", chatRoutes);

app.get("/health", (_, res) => {
  res.status(200).json({ health: "ok" });
});

exports.handler = serverless(app);
