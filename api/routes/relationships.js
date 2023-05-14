import express from "express";
import { getRelationships, addRelationship, deleteRelationship, getFollowers, getNotFollowers } from "../controllers/relationship.js";

const router = express.Router()

router.get("/", getRelationships)
router.get("/followers", getFollowers)
router.get("/notFollowers", getNotFollowers)
router.post("/", addRelationship)
router.delete("/", deleteRelationship)


export default router