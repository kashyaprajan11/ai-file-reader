const serverless = require("serverless-http");
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const githubRoutes = require("./routes/github.js");
const chatRoutes = require("./routes/chat.js");

dotenv.config();

const app = express();

const whitelistedOrigins = ["https://ai-file-reader-frontend.vercel.app/"];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Request Origin:", origin);
      if (
        !origin ||
        whitelistedOrigins.includes(origin) ||
        /^http:\/\/localhost(:\d+)?$/.test(origin)
      ) {
        callback(null, true);
      } else {
        console.error("Blocked Origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
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

exports.handler = serverless(app);
