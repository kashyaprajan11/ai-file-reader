import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { login } from "./auth.js";

interface User {
  id: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

passport.use(new LocalStrategy({ usernameField: "email" }, login));

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user as User);
  });
});
