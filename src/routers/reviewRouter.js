import express from "express";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";
import { fetchReviews, fetchReviewsAdmin, insertReview, updateReviewById } from "../models/reviews/ReviewModel.js";

const router = express.Router()
//  "/api/v1/review"

// public reviews
router.get("/", fetchReviews)

// admin reviews
router.get("/admin-reviews", authenticate, isAdmin, fetchReviewsAdmin)

// create review
router.post("/add-review", authenticate, insertReview)

// edit review for admin
router.put("/admin-edit-review", authenticate, isAdmin, updateReviewById)

export default router