import express from "express";
import homeRouter from "./route/home.js";
import postsRouter from "./route/posts.js";
import { MongoClient } from "mongodb";
import { unknownHandler, errorHandler } from "./middleware/middleware.js";
import { logger } from "./middleware/analysis.js";
import "dotenv/config";

const server = express();

const password = process.env.MN_KEY;
const port = process.env.PORT;
const uri = `mongodb+srv://Abidal:${password}@cluster0.irfyfkz.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  const client = new MongoClient(uri);
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

server.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
