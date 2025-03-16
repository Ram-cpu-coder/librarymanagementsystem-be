import borrowSchema from "./borrowSchema.js";

export const insertBorrow = (borrowObj) => {
    return borrowSchema(borrowObj).save();
}

// get all the borrow
export const getAllBorrows = () => {
    return borrowSchema.find({})
}

// getting the borrow by userId
export const getBorrowByIdModel = (userId) => {
    return borrowSchema.find({ userId })
}

// updating the borrow model

export const updateBorrowModel = (_id, updateObj) => {
    return borrowSchema.findByIdAndUpdate(_id, updateObj)
}