import { fetchReviews, fetchReviewsAdmin, insertReview, updateReviewById } from "../models/reviews/ReviewModel.js"

// getting all the active reviews
export const fetchReviewsController = async (req, res, next) => {
    try {
        const data = await fetchReviews({ status: "active" })
        return res.status(200).json({
            status: "success",
            message: "Successfully fetched the reviews !!!",
            data
        })
    } catch (error) {
        next({
            statusCode: 500,
            message: error?.message
        })
    }
}
// getting all the reviews for admin
export const fetchReviewsAdminController = async (req, res, next) => {
    try {
        const data = await fetchReviewsAdmin()
        return res.status(200).json({
            status: "success",
            message: "Successfully fetched the reviews !!!",
            data
        })
    } catch (error) {
        next({
            statusCode: 500,
            message: error?.message
        })
    }
}
// creating new review
export const insertReviewController = async (req, res, next) => {
    try {
        const userId = req.userData._id
        // console.log(userId)
        const updateObj = req.body
        const reviewObj = { userId, ...updateObj }
        // console.log(reviewObj)
        const data = await insertReview(reviewObj)
        res.status(200).json({
            "status": "success",
            message: "Successfully added review",
            data
        })
    } catch (error) {
        next({
            statusCode: 500,
            message: error?.message
        })
    }
}
// updaing the review
export const updateReviewByIdController = async (req, res, next) => {
    try {

    } catch (error) {
        next({
            statusCode: 500,
            message: error?.message
        })
    }
}