import express from "express";
import homeRouter from "./route/home.js";
import postsRouter from "./route/posts.js";
import { MongoClient } from "mongodb";
import "dotenv/config";

const port = 4000;
const server = express();
server.use(express.json());
const password = process.env.MN_KEY;
const uri = `mongodb+srv://Abidal:${password}@cluster0.irfyfkz.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to DB!");
    server.locals.db = client.db("Restful-API");
  } catch (error) {
    console.log(error);
  }
};
connectDB();
server.use(homeRouter);
server.use("/posts", postsRouter);

server.use("*", (req, res) => {
  res.status(404).send("Sorry,route  not found");
});

server.use((err, req, res, next) => {
  console.log(err);

  res.status(500);
  res.send("There has been an error. We are really sorry");
});

server.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
