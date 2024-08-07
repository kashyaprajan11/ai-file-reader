import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { signup, login } from "../libs/auth.js";
import checkJwtAuth from "../middlewares/checkJwtAuth.js";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({ error: "Email or password is required" });
  }
  const newUser = await signup(req);
  if (newUser === null) {
    return res.status(409).json({ error: "User already exists" });
  }
  return res.status(200).json({ id: newUser.id });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await login(email, password);

  if (user === null) {
    return res.status(403).json({
      message: "Invalid login",
    });
  }

  const secret = process.env.JWT_SECRET as string;

  // Send jwt token
  const token = jwt.sign(user, secret, { expiresIn: "1h" });

  const cookieRes = res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    // maxAge: 1000000,
    // signed: true,
  });

  res.status(200).json({
    user,
  });
});

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.token) {
    res.clearCookie("token");
  }
  res.status(200).json({ message: "Logout successful" });
});

router.get("/auth-check", checkJwtAuth, (req: Request, res: Response) => {
  if (!!req.user) {
    return res.status(200).json({ user: req.user });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

export default router;
