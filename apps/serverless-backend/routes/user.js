import express from "express";

const router = express.Router();

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
});
