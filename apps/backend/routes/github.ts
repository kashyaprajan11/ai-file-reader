import express, { Request, Response } from "express";
import checkJwtAuth from "../middlewares/checkJwtAuth";

const pgPool = require("../db/index");

const router = express.Router();

router.post(
  "/github-url",
  checkJwtAuth,
  async (req: Request, res: Response) => {
    const { githubUrl } = req.body;
    if (!githubUrl) {
      return res.status(500).json({ message: "Github url not provided" });
    }
    if (!req.user) {
      return res.status(500).json({ message: "User doesn't exist" });
    }
    try {
      const user = req.user;
      const newRes = await pgPool.query(
        `insert into file_reader_public.github_url(creator_id, url) values ($1, $2) returning id, creator_id, url`,
        [user?.id, githubUrl]
      );
      const newUrl = newRes.rows[0];

      return res
        .status(200)
        .json({ message: "Successfully inserted github url", data: newUrl });
    } catch (err) {
      console.log("Error adding url", err);
      res.status(503).json({ message: "Server is busy. Please try again" });
    }
  }
);

router.post(
  "/github-url-section",
  checkJwtAuth,
  async (req: Request, res: Response) => {
    const { githubUrlId, content } = req.body;
    if (!content) {
      return res.status(500).json({ message: "Content not provided" });
    }
    if (!githubUrlId) {
      return res
        .status(500)
        .json({ message: "Id for the github-url not provided" });
    }
    try {
      const newRes = await pgPool.query(
        `insert into file_reader_public.github_url_sections(github_url_id, content) values ($1, $2) returning *`,
        [githubUrlId, content]
      );
      const section = newRes.rows[0];
      return res
        .status(200)
        .json({ message: "Github sections saved successfully" });
    } catch (err) {
      console.log("Error encountered while saving parsed content", err);
      res.status(503).json({ message: "Server is busy. Please try again" });
    }
  }
);

export default router;
