import ReviewSchema from "./ReviewSchema.js"

// public reviews
export const fetchReviews = (filterObj) => {
    return ReviewSchema.find(filterObj)
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
export const updateReviewById = (id, status) => {
    //  updateByIdAndUpdate always takes id and an object
    return ReviewSchema.findByIdAndUpdate(id, status, { new: true })
}