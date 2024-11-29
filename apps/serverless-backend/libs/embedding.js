// Dynamic import since require doesn't work with @xenova/transformers

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
