import express from "express";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";
import { createBorrow, deleteBorrow, getBorrow, getBurrowById, updateBorrow } from "../controllers/borrowController.js";

const router = express.Router();

router.post("/", authenticate, createBorrow)
router.get("/get-all", authenticate, getBorrow)
router.get("/", authenticate, getBurrowById)
router.put("/:_id", authenticate, updateBorrow)
router.delete("/", authenticate, isAdmin, deleteBorrow)

export default router;