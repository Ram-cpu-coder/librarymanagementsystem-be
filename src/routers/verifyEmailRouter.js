import express from "express";
import { verifyEmailController, verifyOTPForgotPassword } from "../controllers/verifyEmailController.js";
const router = express.Router()

router.get("/", verifyEmailController)
router.post("/", verifyOTPForgotPassword)

export default router;