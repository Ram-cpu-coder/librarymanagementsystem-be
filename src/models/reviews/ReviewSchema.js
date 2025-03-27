
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },
        bookId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        borrowId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        thumbnail: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            required: true
        },
        heading: {
            type: String,
            required: true
        },
        ratings: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }, {
    timestamps: true
}
)

export default mongoose.model("Review", reviewSchema)