import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import ConnectPgSimple from "connect-pg-simple";
import session from "express-session";
import passport from "passport";

import authRoutes from "./routes/auth.js";

const pgPool = require("./db/index.js");

const PORT: Number = Number(process.env.PORT);

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.disable("x-powered-by");
app.use(morgan("tiny"));
app.use(express.json());

const PgStore = ConnectPgSimple(session);
const sessionStore = new PgStore({
  pool: pgPool,
  schemaName: "file_reader_private",
  tableName: "session",
});

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "",
    rolling: true,
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: false, // Todo: make this true
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

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
