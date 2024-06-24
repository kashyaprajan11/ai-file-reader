import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function checkJwtAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  try {
    const secret = process.env.JWT_SECRET as string;
    const user = jwt.verify(token, secret);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
}
