import express from "express";
import { getCountry, getRegion, getCity } from "../controllers/location.js";

const router = express.Router()

router.get("/country", getCountry)
router.get("/region", getRegion)
router.get("/city", getCity)


export default router