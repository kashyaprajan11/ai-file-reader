import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import { signup } from "../libs/auth.js";

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

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login-failure" }),
  (req: Request, res: Response) => {
    if (req.user && (req.user as User).id) {
      return res.status(200).json({
        status: "success",
        user: {
          ...req.user,
        },
      });
    }
  }
);

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
