const { codeBlock } = require("common-tags");
const OpenAI = require("openai");
const express = require("express");

const { pgPool } = require("../db/index.js");
const checkJwtAuth = require("../middlewares/checkJwtAuth.js");
const { createEmbedding } = require("../libs/embedding.js");
const { getChatGptAnswer } = require("../libs/openai.js");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const router = express.Router();

router.post("/user", checkJwtAuth, async (req, res) => {
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
  FROM file_reader_public.match_github_section($1::vector(384), $2, $3::uuid) LIMIT 20
`;

    const values = [embedding, match_threshold, user?.id];

    const { rows } = await pgPool.query(query, values);

    console.log("rows", rows);

    if (!rows) {
      return res.status(500).json({
        message: "There was an error reading your documents, Please try again",
      });
    }

    const combinedContent =
      rows && rows.length > 0
        ? rows.map(({ content }) => content).join("\n\n")
        : "No documents found";

    // const completionMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
    //   [
    //     {
    //       role: "user",
    //       content: codeBlock`
    //       You're an AI assistant who answers questions about documents.

    //       You're a chat bot, so keep your replies succinct.

    //       You're only allowed to use the documents below to answer the question.

    //       If the question isn't related to these documents, say:
    //       "Sorry, I couldn't find any information on that."

    //       If the information isn't available in the below documents, say:
    //       "Sorry, I couldn't find any information on that."

    //       Do not go off topic.

    //       Documents:
    //       ${combinedContent}
    //     `,
    //     },
    //     ...messages,
    //   ];

    // const completionStream = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo-0125",
    //   messages: completionMessages,
    //   max_tokens: 1024,
    //   temperature: 0,
    //   stream: true,
    // });

    // return new Response(completionStream, {
    //   headers: {
    //     "Content-Type": "text/event-stream",
    //     "Cache-Control": "no-cache",
    //     Connection: "keep-alive",
    //   },
    // });

    // return res.status(200).json({ success: true, result: rows });

    const content = codeBlock`
    You're an AI assistant who answers questions about github readme files.

    I'll provide you the contents that are similar to the user prompt by doing a similarity search with pgvector;

    You're a chat bot, so keep your replies succinct.

    You're allowed to use the documents below to answer the question.

    Question that the user asked is:
    ${userPrompt}

    If the question isn't related to these documents, say:
    "Sorry, I couldn't find any information on that."

    If the information isn't available in the below documents, say:
    "Sorry, I couldn't find any information on that."

    Do not go off topic.

    Github Readme Content:
    ${combinedContent}
  `;
    const answer = await getChatGptAnswer(content);

    return res.status(200).json({ success: true, combinedContent, answer });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch chat" });
  }
});

module.exports = router;
