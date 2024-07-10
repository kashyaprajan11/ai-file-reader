import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../interface";

export default function checkJwtAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  try {
    const secret = process.env.JWT_SECRET as string;
    const user = jwt.verify(token, secret);
    if (typeof user !== "object" || !user.id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }
    req.user = user as User;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
}
