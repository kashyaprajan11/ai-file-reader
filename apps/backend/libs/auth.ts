import bcrypt from "bcrypt";
import { Request } from "express";

const pgPool = require("../db/index.js");

interface User {
  id: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

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

async function login(email: string, password: string) {
  try {
    const userRes = await pgPool.query(
      `select * from file_reader_public.user where email = $1`,
      [email]
    );
    const user = userRes.rows[0];

    if (!user) {
      return null;
    }
    const isMatched = await bcrypt.compare(password, user.password_hash);

    console.log("ismatched in fn", isMatched);

    if (isMatched) {
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log("Error faced while logging in", err);
  }
}

export { signup, login };
