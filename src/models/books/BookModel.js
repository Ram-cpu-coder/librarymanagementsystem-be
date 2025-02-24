import BookSchema from "./BookSchema.js";

// create book
export const insertBook = (bookObj) => {
  return BookSchema(bookObj).save();
};

// get all books
// filterObj must be the object
export const getAllBooks = (filterObj) => {
  return BookSchema.find(filterObj);
};


// update the books
export const updateBookModel = ({ _id, ...bookObj }) => {
  return BookSchema.findByIdAndUpdate(_id, ...bookObj)
};
