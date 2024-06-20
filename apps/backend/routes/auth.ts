import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { signup, login } from "../libs/auth.js";

const router = express.Router();

interface User {
  id: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

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
      error: "Invalid login",
    });
  }

  const secret = process.env.JWT_SECRET as string;

  // Send jwt token
  const token = jwt.sign(user, secret, { expiresIn: "1h" });

  console.log(token);

  const cookieRes = res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
    // secure: true,
    // maxAge: 1000000,
    // signed: true,
  });

  console.log(cookieRes);

  res.status(200).json({
    user,
  });
});

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ message: "ok" });
    }
  });
});

export default router;
