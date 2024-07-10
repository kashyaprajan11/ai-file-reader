import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import githubRoutes from "./routes/github.js";

const PORT: Number = Number(process.env.PORT);

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

// Server setup
app.listen(PORT, () => {
  console.log(
    "The application is listening " + "on port http://localhost:" + PORT
  );
});
