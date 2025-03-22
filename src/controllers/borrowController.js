import { updateBookModel } from "../models/books/BookModel.js";
import { getAllBorrows, getBorrowByIdModel, insertBorrow, updateBorrowModel } from "../models/borrowHistory/borrowModel.js";

export const createBorrow = async (req, res, next) => {
    try {
        const userId = req.userData._id;
        // ask from where this userData will come

        const { bookId, title, thumbnail } = req.body;


        // due day is 15 days
        const BURROWINGDAYS = 15;

        const today = new Date();

        const dueDate = today.setDate(today.getDate() + BURROWINGDAYS, "day");
        const returnedDate = 0;
        const borrowObj = {
            userId,
            bookId,
            dueDate,
            returnedDate,
            title,
            thumbnail
        }
        const data = await insertBorrow(borrowObj);

        if (data) {
            // upon successful insertion of the burrowing of the book
            const updateObj = {
                bookId: bookId,
                isAvailable: false,
                expectedAvailable: dueDate
            }
            // updating the availability of the borrowed book
            const bookData = await updateBookModel(updateObj)
            // console.log(bookData)
        }
        return res.status(200).json({
            status: "success",
            message: "Borrow Created !",
            data,
        })
    } catch (error) {
        next({
            statusCode: 500,
            message: error?.message
        })
    }

}

export const getBorrow = async (req, res, next) => {
    try {
        const data = await getAllBorrows();

        return res.status(200).json({
            status: "success",
            message: "Successfully fetched the borrows !!!",
            data
        })
    } catch (error) {
        // console.log(error)
        next({
            statusCode: 500,
            message: error?.message
        })

    }
}

export const getBurrowById = async (req, res, next) => {
    try {

        // 1. get the uesrId
        const userId = req.userData._id;

        // 2. get the borrowed books by id
        const borrowedBooks = await getBorrowByIdModel(userId)
        return res.status(201).json({
            status: "success",
            message: "Borrow Found",
            borrowedBooks
        })
    } catch (error) {
        // console.log(error)
        next({
            statusCode: 500,
            message: error?.message
        })
    }
}
// returning the borrows
export const updateBorrow = async (req, res, next) => {
    try {
        const today = new Date()
        // 1. get the borrow id from the params
        const { _id } = req.params;

        // 2. update the borrow record 
        const borrowedBook = await updateBorrowModel(_id, {
            status: "returned",
            returnedDate: today.getDate()
        })
        // 3. update the book 
        const updatedBook = await updateBookModel(borrowedBook.bookId, {
            isAvailable: true,
        })

        return res.status(200).json({
            status: "success",
            message: "Borrow Updated",
            updatedBook
        })
    } catch (error) {
        // console.log(error)
        next({
            statusCode: 500,
            message: error?.message
        })
    }
}