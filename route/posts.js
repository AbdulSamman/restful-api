import { Router } from "express";
import {
  getPosts,
  addPost,
  getOne,
  updatePosts,
  deletePosts,
} from "../controllers/postsController.js";

const router = Router();

router.get("/", getPosts);
router.post("/", addPost);
router.get("/:id", getOne);
router.put("/:id", updatePosts);
router.delete("/:id", deletePosts);

export default router;
