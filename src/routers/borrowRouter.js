import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { createBorrow, getBorrow, getBurrowById, updateBorrow } from "../controllers/borrowController.js";

const router = express.Router();

router.post("/", authenticate, createBorrow)
router.get("/get-all", authenticate, getBorrow)
router.get("/", authenticate, getBurrowById)
router.put("/:_id", authenticate, updateBorrow)

export default router;