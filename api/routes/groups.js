import express from "express";
import {getGroups, addGroup, findGroup, searchGroups} from "../controllers/group.js";

const router = express.Router();

router.get("/find/:groupId", findGroup);
router.get("/search", searchGroups);
router.get("/", getGroups);
router.post("/", addGroup);
// router.delete("/:id", deleteGroup);

export default router;