
import mongoose from "mongoose";

const BorrowSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        bookId: {
            // payload
            type: mongoose.Types.ObjectId,
            ref: "Book",
            required: true
        },
        burrowDate: {
            type: Date,
            default: Date.now(),
            required: true
        },
        dueDate: {
            // calculation
            type: Date,
            required: true,
        },
        title: {
            // payload
            type: String,
            required: true
        },
        thumbnail: {
            // payload
            type: String,
            required: true,
        },
        returnDate: {
            // add when returned 
            type: Date,
        },
        status: {
            type: String,
            enum: ["borrowed", "returned"],
            default: "borrowed"
        }
    },
    {
        timestamps: true,
    }

)
export default mongoose.model("Borrow", BorrowSchema)