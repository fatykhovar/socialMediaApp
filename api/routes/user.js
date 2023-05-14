import express from "express";
import { getUser , updateUser, searchUsers, getUsers} from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.get("/search", searchUsers)
router.get("/", getUsers)
router.put("/", updateUser)


export default router