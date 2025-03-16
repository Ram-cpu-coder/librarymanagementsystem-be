import { updateBookModel } from "../models/books/BookModel.js";
import { insertBorrow } from "../models/borrowHistory/borrowModel.js";

export const createBorrow = async (req, res, next) => {
    try {
        const userId = req.userData._id;
        // ask from where this userData will come

        const { bookId, title, thumbnail } = req.body;


        // due day is 15 days
        const BURROWINGDAYS = 15;

        const today = new Date();

        const dueDate = today.setDate(today.getDate() + BURROWINGDAYS, "day");

        const borrowObj = {
            userId,
            bookId,
            dueDate,
            title,
            thumbnail
        }
        const data = await insertBorrow(borrowObj);

        if (data) {
            // upon successful insertion of the burrowing of the book
            const bookData = await updateBookModel(bookId, {
                isAvailable: false,
                expectedAvailable: dueDate
            })
            return res.status(200).json({
                status: "success",
                message: "Borrow Created !",
                data,
                bookData
            })
        }
    } catch (error) {
        console.log(error)

        next({
            statusCode: 500,
            message: error?.message
        })

        // return res.status(500).json({
        //     status: error,
        //     message: error?.message
        // })
    }

}