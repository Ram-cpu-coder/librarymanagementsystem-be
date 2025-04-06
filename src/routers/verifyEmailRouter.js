import express from "express";
import { generateOTPController, verifyEmailController, verifyTokenForgotPassword } from "../controllers/verifyEmailController.js";
const router = express.Router()

router.get("/", verifyEmailController)
router.post("/", verifyTokenForgotPassword)
// router.get("/", generateOTPController)

export default router;