import express from "express";
import homeRouter from "./route/home.js";
import postsRouter from "./route/posts.js";
import { MongoClient } from "mongodb";
import { unknownHandler, errorHandler } from "./middleware/middleware.js";
import { logger } from "./middleware/analysis.js";
//import "dotenv/config";
import cors from "cors";

const server = express();
server.use(cors());

const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI;

const connectDB = async () => {
  const client = new MongoClient(DB_URI);
  try {
    await client.connect();
    console.log("Connected to DB!");
    server.locals.db = client.db("Restful-API");
  } catch (error) {
    throw new Error(error);
  }
};
connectDB();

server.use(express.json());

server.use(homeRouter);
server.use("/posts", postsRouter);
server.use(logger);
//404
server.use(unknownHandler);

//Error Handler
server.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
