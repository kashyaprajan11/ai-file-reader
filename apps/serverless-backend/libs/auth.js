const bcrypt = require("bcryptjs");
const { pgPool } = require("../db/index.js");

async function signup(req) {
  const { email, password } = req.body;
  let newUser = null;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("password", hashedPassword);
    const newRes = await pgPool.query(
      `insert into file_reader_public.user (email, password_hash) values ($1, $2) returning *`,
      [email, hashedPassword]
    );
    console.log("newRes", newRes);
    newUser = newRes.rows[0];
  } catch (err) {
    return null;
  }
  return newUser;
}

async function login(email, password) {
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

    if (isMatched) {
      const res = await pgPool.query(
        `SELECT set_config('jwt.claims.user_id', $1, false)`,
        [user.id]
      );
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log("Error faced while logging in", err);
  }
}

module.exports = { signup, login };
