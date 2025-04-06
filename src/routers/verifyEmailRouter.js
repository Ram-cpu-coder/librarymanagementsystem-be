import express from "express";
import { verifyEmailController } from "../controllers/verifyEmailController.js";
const router = express.Router()

router.get("/", verifyEmailController)

export default router;