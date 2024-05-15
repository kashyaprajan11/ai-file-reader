import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/user/:userId", async (req: Request, res : Response) => {
    const userId = req.params.userId

    
})