// const serverless = require("serverless-http");
// const express = require("express");
import serverless from "serverless-http";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import githubRoutes from "./routes/github.js";
import chatRoutes from "./routes/chat.js";

const PORT = Number(process.env.PORT);

const whitelistedOrigins = ["http://localhost:3000"];

dotenv.config();

const app = express();

app.use(
  cors({
    origin: whitelistedOrigins,
    credentials: true,
  })
);
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

// app.get("/", (req, res, next) => {
//   return res.status(200).json({
//     message: "Hello from root!",
//   });
// });

// app.get("/hello", (req, res, next) => {
//   return res.status(200).json({
//     message: "Hello from path!",
//   });
// });

// app.use((req, res, next) => {
//   return res.status(404).json({
//     error: "Not Found",
//   });
// });

export const handler = serverless(app);
