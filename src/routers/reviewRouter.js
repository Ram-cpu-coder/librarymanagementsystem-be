import express from "express";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";
import { deleteReviewByIdController, fetchReviewOfUsers, fetchReviewsAdminController, fetchReviewsController, insertReviewController, updateReviewByIdController } from "../controllers/reviewController.js";


const router = express.Router()

//  "/api/v1/review"

// public reviews
router.get("/", fetchReviewsController)

// reviews of the user
router.get("/user-review", authenticate, fetchReviewOfUsers)

// admin reviews
router.get("/admin-reviews", authenticate, isAdmin, fetchReviewsAdminController)

// create review
router.post("/add-review", authenticate, insertReviewController)

// edit review for admin
router.put("/admin-edit-review", authenticate, isAdmin, updateReviewByIdController)

router.delete("/delete-review", authenticate, isAdmin, deleteReviewByIdController)

export default router