import {  StreamTextResult } from "ai";
import {codeBlock} from "common-tags"
import OpenAI from "openai"
import express, { Request, Response } from "express";

import checkJwtAuth from "../middlewares/checkJwtAuth.js";
import { createEmbedding } from "../libs/embedding.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const router = express.Router();

router.get("/chat", checkJwtAuth, async (req: Request, res: Response) => {
    const {userPrompt, chatId, message, messages} = req.body;
    const match_threshold = 0.8
 
    const embedding = await createEmbedding(userPrompt) // Returns stringifies embedding only

    const query = `SELECT id, resume_link, phone_number, attributes, created_at FROM file_reader_public.github_url_sections('${embedding}'::vector(1536), ${match_threshold}) LIMIT 30;`;
    



    
})

