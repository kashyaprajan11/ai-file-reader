const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createEmbedding = async (content) => {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: content,
    });

    const embedding = response.data[0].embedding;
    return JSON.stringify(embedding);
  } catch (err) {
    console.error("Error creating embedding:", err);
    throw err;
  }
};

module.exports = { createEmbedding };
