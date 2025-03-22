import ReviewSchema from "./ReviewSchema.js"

// public reviews
export const fetchReviews = (userId) => {
    return ReviewSchema.findById(userId)
}
// admin reviews
export const fetchReviewsAdmin = () => {
    return ReviewSchema.find({})
}

// create review
export const insertReview = (obj) => {
    return ReviewSchema(obj).save()
}
// edit review for admin
export const updateReviewById = (id) => {
    return ReviewSchema.findByIdAndUpdate(id)
}