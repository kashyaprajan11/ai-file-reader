import express, { Request, Response, NextFunction } from "express";
import { signup } from "../libs/auth.js";

const router = express.Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({ error: "Email or password is required" });
    }
    const newUser = await signup(req);
    if (newUser === null) {
      return res.status(409).json({ error: "User already exists" });
    }
    return res.status(200).json({ id: newUser.id });
  }
);

export default router;
