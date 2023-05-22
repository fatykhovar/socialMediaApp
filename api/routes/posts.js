import express from "express";
import { getPosts, addPost, deletePost, getFriendsPosts } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/friends", getFriendsPosts);
router.post("/", addPost);
router.delete("/:id", deletePost);

export default router;