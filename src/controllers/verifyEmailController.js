import { findOTPByAssociate, findRegisterSessionById } from "../models/sessions/sessionSchema.js"
import { getUserByEmail, updateUser } from "../models/users/UserModel.js"

export const verifyEmailController = async (req, res, next) => {
    try {
        // get the token and session id from the query 
        const token = req.query.t
        const sessionId = req.query.sessionId

        if (!token || !sessionId) {
            return next({
                statusCode: 404,
                message: "Registration Link expired or invalid link!",
                errorMessage: "No Token or No Session Id or One of them is wrong!"
            })
        }
        // get the token and session id from the database
        const registerSession = await findRegisterSessionById(sessionId)
        const userEmail = await registerSession.associate;
        if (!registerSession || token !== registerSession.token) {
            return next({
                statusCode: 404,
                message: "Verification Failed!",
                errorMessage: "Token and SessionId are not verified!"
            })
        }
        // find the user 
        const userFoundUsingEmail = await getUserByEmail(userEmail)

        if (!userFoundUsingEmail) {
            return next({
                statusCode: 404,
                message: "User not found!",
                errorMessage: "No user of this email in the database!"
            })
        }
        // if they are same, update the user as verified true
        const verifiedUpdatedUser = await updateUser(userFoundUsingEmail._id, { isVerified: true })

        return res.status(200).json({
            status: "success",
            message: "Your Account has been Successfully verified!",
            verifiedUpdatedUser
        })
    } catch (error) {
        return next({
            statusCode: 500,
            message: "Internal error while verifying the user!",
            errorMessage: error.message
        })
    }
}
export const verifyOTPForgotPassword = async ({ associate, OTP }) => {
    try {
        // get the OTP from database
        const OTPFromDB = await findOTPByAssociate({ associate, OTP })
        if (!OTPFromDB) {
            return "Invalid OTP, Try Again!"
        }

        if (OTPFromDB.expiresAt < new Date()) {
            return "OTP has expired!"
        }
        // OTP is valid, you can proceed with the next step (e.g., reset the password)
        return "OTP has been Verified!"
    } catch (error) {
        throw new Error(error.message)
    }
}
// generation of the OTP
export const generateOTPController = async (req, res, next) => {
    try {
        const OTP = Math.ceil(Math.random() * 100000);
        return OTP
    } catch (error) {
        throw new Error(error.message)
    }
}
