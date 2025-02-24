import express from "express";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";
import { createBookValidator, updateBookValidator } from "../middlewares/joiValidation.js";
import { createBook, adminGetAllBooks, updateBook, getPubBooks } from "../controllers/bookControllers.js";

const router = express.Router();

// POST api/v1/books
router.post("/", authenticate, isAdmin, createBookValidator, createBook);
router.get("/", authenticate, isAdmin, adminGetAllBooks)
router.get("/pub-books", getPubBooks)
router.put("/", authenticate, isAdmin, updateBookValidator, updateBook)

export default router;
