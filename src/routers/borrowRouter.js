import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { createBorrow, getBorrow } from "../controllers/borrowController.js";

const router = express.Router();

router.post("/", authenticate, createBorrow)
router.get("/", authenticate, getBorrow)

export default router;