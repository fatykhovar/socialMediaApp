import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/comment.js";

const router = express.Router();

router.get("/", getGroupComments);
router.post("/", addGroupComment);
router.delete("/:id", deleteGroupComment);

export default router;