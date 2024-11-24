// server.js
import { handler } from "./handler.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

// Create an Express app for local development
const app = express();

// Middleware to transform lambda events
app.use(async (req, res, next) => {
  try {
    // Create a fake Lambda event
    const event = {
      httpMethod: req.method,
      path: req.path,
      headers: req.headers,
      queryStringParameters: req.query,
      body: JSON.stringify(req.body),
      isBase64Encoded: false,
    };

    // Create a fake Lambda context
    const context = {
      functionName: "local-dev",
      functionVersion: "$LATEST",
      invokedFunctionArn: "local",
      memoryLimitInMB: "128",
      awsRequestId: "local",
      logGroupName: "local",
      logStreamName: "local",
      getRemainingTimeInMillis: () => 30000,
    };

    // Call the serverless handler
    const result = await handler(event, context);

    // Send the response
    res
      .status(result.statusCode)
      .set(result.headers || {})
      .send(result.body);
  } catch (error) {
    next(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Local development server running on http://localhost:${PORT}`);
});
