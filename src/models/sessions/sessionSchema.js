
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
        associate: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true
    }
)

const SessionSchema = mongoose.model("Sessions", sessionSchema)
export const insertToken = (obj) => {
    return SessionSchema(obj).save()
}
export const findToken = (token) => {
    return SessionSchema.findOne({ token })
}