import { updateBorrowModel } from "../models/borrowHistory/borrowModel.js"
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
        // const reviewObj = { userId, ...updateObj }
        // console.log(reviewObj)
        const data = await insertReview(updateObj)

        // update the borrowstatus
        const updateBorrow = await updateBorrowModel(data.borrowId, {
            status: "reviewed"
        })
        res.status(200).json({
            "status": "success",
            message: "Successfully added review",
            data,
            updateBorrow
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
        // update the review 

        // update the borrowStatus
    } catch (error) {
        next({
            statusCode: 500,
            message: error?.message
        })
    }
}