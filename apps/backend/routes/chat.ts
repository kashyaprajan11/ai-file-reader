import { StreamTextResult } from "ai";
import { codeBlock } from "common-tags";
import OpenAI from "openai";
import express, { Request, Response } from "express";

import { pgPool } from "../db/index.js";
import checkJwtAuth from "../middlewares/checkJwtAuth.js";
import { createEmbedding } from "../libs/embedding.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const router = express.Router();

router.post("/user", checkJwtAuth, async (req: Request, res: Response) => {
  if (!req.body.userPrompt) {
    return res.status(500).json({ message: "User prompt not provided" });
  }
  try {
    const { userPrompt, chatId, message, messages } = req.body;
    const { user } = req;
    const match_threshold = 0.8;

    const embedding = await createEmbedding(userPrompt); // Returns stringifies embedding only

    const query = `
  SELECT id, github_url_id, content, created_at 
  FROM file_reader_public.match_github_section($1::vector(384), $2, $3::uuid)
`;

    const values = [embedding, match_threshold, user?.id];

    const { rows } = await pgPool.query(query, values);

    return res.status(200).json({ success: true, result: rows });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch chat" });
  }
});

export default router;
