const express = require("express");
const checkJwtAuth = require("../middlewares/checkJwtAuth.js");
const { createEmbedding } = require("../libs/embedding.js");
const { pgPool } = require("../db/index.js");

const router = express.Router();

router.post("/github-url", checkJwtAuth, async (req, res) => {
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
});

router.post("/github-url-section", checkJwtAuth, async (req, res) => {
  const { githubUrlId, content } = req.body;
  if (!content) {
    return res.status(500).json({ message: "Content not provided" });
  }
  if (!githubUrlId) {
    return res
      .status(500)
      .json({ message: "Id for the github-url not provided" });
  }
  const embedding = await createEmbedding(content);
  if (embedding === null) {
    return res
      .status(500)
      .json({ message: "Error encountered while creating embedding" });
  }
  try {
    const newRes = await pgPool.query(
      `insert into file_reader_public.github_url_sections(github_url_id, content, embedding) values ($1, $2, $3) returning *`,
      [githubUrlId, content, embedding]
    );
    const section = newRes.rows[0];
    return res
      .status(200)
      .json({ message: "Github sections saved successfully" });
  } catch (err) {
    console.log("Error encountered while saving parsed content", err);
    res.status(503).json({ message: "Server is busy. Please try again" });
  }
});

// This is the route which changes the text prompt to embedding and run the match_github_section function that is in db

router.get("/get-answer", checkJwtAuth, async (req, res) => {
  const { question } = req.body;

  if (!question) {
  }
});

module.exports = router;
