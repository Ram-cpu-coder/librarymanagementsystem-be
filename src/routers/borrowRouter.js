import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { createBorrow } from "../controllers/borrowController.js";

const router = express.Router();

router.post("/", authenticate, createBorrow)

export default router;