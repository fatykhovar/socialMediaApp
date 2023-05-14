import express from "express";
import { getGroupRelationships, addGroupRelationship, deleteGroupRelationship, getGroupFollowers, getGroupNotFollowers } from "../controllers/groupRelationship.js";

const router = express.Router()

router.get("/", getGroupRelationships)
router.get("/followers", getGroupFollowers)
router.get("/notFollowers", getGroupNotFollowers)
router.post("/", addGroupRelationship)
router.delete("/", deleteGroupRelationship)


export default router