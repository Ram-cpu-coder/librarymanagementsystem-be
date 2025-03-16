import borrowSchema from "./borrowSchema.js";

export const insertBorrow = (borrowObj) => {
    return borrowSchema(borrowObj).save();
}

// get all the borrow
export const getBorrow = () => {
    return borrowSchema.find({})
}

// getting the borrow by userId
export const getBorrowsByUserId = (userId) => {
    return borrowSchema.find({ userId })
}