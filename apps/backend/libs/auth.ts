import bcrypt from "bcrypt";
import { Request } from "express";

const pgPool = require("../db/index.js");

async function signup(req: Request) {
  const { email, password } = req.body;
  let newUser = null;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newRes = await pgPool.query(
      `insert into file_reader_public.user (email, password_hash) values ($1, $2) returning *`,
      [email, hashedPassword]
    );
    newUser = newRes.rows[0];
  } catch (err) {
    return null;
  }
  return newUser;
}

async function login(email: string, password: string, cb: Function) {
  try {
    const userRes = await pgPool.query(
      `select * from file_reader.public where email = $1`,
      [email]
    );
    const user = userRes.rows[0];
    if (!user) {
      return cb(null, false, {
        message: "Account does not exists",
      });
    }
    const isMatched = await bcrypt.compare(password, user.password_hash);

    if (isMatched) {
      return cb(null, user);
    } else {
      return cb(null, false, {
        message: "Incorrect password",
      });
    }
  } catch (err) {
    cb(err);
  }
}

export { signup, login };
