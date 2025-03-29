import { updateBorrowModel } from "../models/borrowHistory/borrowModel.js"
import { deleteReviewById, fetchReviews, fetchReviewsAdmin, fetchReviewUser, insertReview, updateReviewById } from "../models/reviews/ReviewModel.js"


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

// fetchReviewOfUsers
export const fetchReviewOfUsers = async (req, res, next) => {
    try {

        const id = req.userData._id
        const reviews = await fetchReviewUser(id)

        if (reviews) {
            return res.status(200).json({
                status: "success",
                message: "Reviews Fetched!",
                reviews
            })
        }
    } catch (error) {
        next({
            statusCode: 500,
            message: error?.message,
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
        const { _id, status } = req.body;
        const response = await updateReviewById(_id, { status })
        if (response) {
            return res.status(200).json({
                status: "success",
                message: "Updated the status of Review!",
                response
            })
        }
    } catch (error) {
        next({
            statusCode: 500,
            message: error?.message
        })
    }
}

export const deleteReviewByIdController = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const data = await deleteReviewById(_id);
        if (data) {
            return res.status(200).json({
                status: "success",
                message: "Deleted Successfully !",
                data
            })
        }
    } catch (error) {
        next({
            statusCode: 500,
            message: error?.message
        })
    }
}