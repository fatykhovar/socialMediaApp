import express from "express";
import { getCountry } from "../controllers/location.js";

const router = express.Router()

router.get("/country", getCountry)


export default router