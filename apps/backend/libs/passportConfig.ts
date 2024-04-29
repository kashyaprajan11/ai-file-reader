import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { login } from "./auth.js";

export default function passportConfig() {
  // passport.serializeUser((user, cb) => {
  //   process.nextTick(() => {
  //     return cb(null, user);
  //   });
  // });

  // passport.deserializeUser((user, cb) => {
  //   process.nextTick(() => {
  //     return cb(null, user);
  //   });
  // });

  passport.use(
    "local-login",
    new LocalStrategy({ usernameField: "email" }, login)
  );
}
