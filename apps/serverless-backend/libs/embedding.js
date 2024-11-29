// const { pipeline } = require("@xenova/transformers");

// async function createEmbedding(content) {
//   try {
//     const pipe = await pipeline("feature-extraction", "Supabase/gte-small");
//     // Generate the embedding from text
//     const output = await pipe(content, {
//       pooling: "mean",
//       normalize: true,
//     });

//     // Extract the embedding output
//     const embedding = Array.from(output.data);
//     return JSON.stringify(embedding);
//   } catch (err) {
//     console.log("Error creating embedding", err);
//     return null;
//   }
// }

// module.exports = { createEmbedding };

// libs/embedding.js
module.exports = {
  createEmbedding: async (content) => {
    const { pipeline } = await import("@xenova/transformers");
    try {
      const pipe = await pipeline("feature-extraction", "Supabase/gte-small");
      const output = await pipe(content, {
        pooling: "mean",
        normalize: true,
      });

      const embedding = Array.from(output.data);
      return JSON.stringify(embedding);
    } catch (err) {
      console.log("Error creating embedding", err);
      return null;
    }
  },
};
