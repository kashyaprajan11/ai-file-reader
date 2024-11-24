import jwt from "jsonwebtoken";

export default function checkJwtAuth(req, res, next) {
  const token = req.cookies.token;
  try {
    const secret = process.env.JWT_SECRET;
    const user = jwt.verify(token, secret);
    if (typeof user !== "object" || !user.id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
}
