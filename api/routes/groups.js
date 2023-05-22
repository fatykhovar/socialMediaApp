import express from "express";
import {getGroups, addGroup, findGroup, searchGroups, getGroupTheme} from "../controllers/group.js";

const router = express.Router();

router.get("/find/:groupId", findGroup);
router.get("/search", searchGroups);
router.get("/", getGroups);
router.get("/theme", getGroupTheme);
router.post("/", addGroup);
// router.delete("/:id", deleteGroup);

export default router;