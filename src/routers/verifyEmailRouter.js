import express from "express";
import { updatePassword, verifyEmailAndSendOtp, verifyEmailController, verifyOtp } from "../controllers/verifyEmailController.js";
const router = express.Router()

router.get("/", verifyEmailController) // activating the user after registering 
router.post("/verifyEmail", verifyEmailAndSendOtp)
router.post("/verifyOtp", verifyOtp)
router.post("/updatePassword", updatePassword)

export default router;