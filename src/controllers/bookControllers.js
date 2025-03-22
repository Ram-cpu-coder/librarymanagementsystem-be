import { deleteBookModel, getAllBooks, insertBook, updateBookModel } from "../models/books/BookModel.js";

// create the book
export const createBook = async (req, res, next) => {
  try {
    console.log(111, req.file.filename)
    req.body.thumbnail = "/thumbnail/" + req.file.filename;
    const book = await insertBook(req.body);

    book?._id
      ? res.json({
        status: "success",
        message: "Book created successfully",
        book,
      })
      : next({
        status: 401,
        message: "Book cannot be created!",
      });
  } catch (error) {
    console.log(error)
    next({
      status: 500,
      message: "Error creating book",
    });
  }
};


export const adminGetAllBooks = async (req, res, next) => {
  try {
    const books = await getAllBooks()
    res.json({
      status: "success",
      message: "Book fetched successfully",
      books,
    })

  } catch (error) {
    // console.log(error)
    next({
      status: 500,
      message: "Could not fetch the books"
    })
  }
}

export const getPubBooks = async (req, res, next) => {
  try {
    const books = await getAllBooks({
      status: "active"
    })
    res.json({
      status: "success",
      message: "Book fetched successfully",
      books,
    })

  } catch (error) {
    console.log(error)
    next({
      status: 500,
      message: "Could not fetch the books"
    })
  }
}
export const updateBook = async (req, res, next) => {
  try {
    const books = await updateBookModel(req.body)
    books?._id ?
      res.json({
        status: "success",
        message: "Book has been updated successfully",
        books,
      })
      : next({
        status: 401,
        message: "Book can not be updated."
      })

  } catch (error) {
    console.log(error)
    next({
      status: 500,
      message: "Could not fetch the books", error,
      error: error?.message
    })
  }
}

// delete method for bookController

export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteBookModel(id)
    data ? res.json({
      status: "success",
      message: "Book has been deleted successfully",
      data,
    }) : next({
      status: 401,
      message: "Book can not be deleted."
    })

  } catch (error) {
    console.log(error)
    next({
      status: 500,
      message: "Could not fetch the book"
    })
  }

}