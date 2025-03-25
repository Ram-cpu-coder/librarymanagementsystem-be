import express from "express";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";
import { fetchReviewsAdminController, fetchReviewsController, insertReviewController, updateReviewByIdController } from "../controllers/reviewController.js";


const router = express.Router()

//  "/api/v1/review"

// public reviews
router.get("/", fetchReviewsController)

// admin reviews
router.get("/admin-reviews", authenticate, isAdmin, fetchReviewsAdminController)

// create review
router.post("/add-review", authenticate, insertReviewController)

// edit review for admin
router.put("/admin-edit-review", authenticate, isAdmin, updateReviewByIdController)

export default router