import { findOTPByAssociate, findRegisterSessionById, insertOTP } from "../models/sessions/sessionSchema.js"
import { getUserByEmail, updateUser } from "../models/users/UserModel.js"
import { sendOTP } from "../services/emailServices.js"

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
// generation of the OTP
export const verifyEmailAndSendOtp = async (req, res, next) => {
    try {
        // generating OTP function
        const generateRandomNumber = () => {
            const string = "0123456789";
            const len = 6;
            let otp = "";
            for (let i = 0; i < len; i++) {
                const randomIndex = Math.floor(Math.random() * string.length)
                otp += string[randomIndex]
            }
            return otp;
        }
        const Otp = generateRandomNumber()
        console.log(Otp, "Otp")

        // verifying the email
        const { email } = req.body;
        console.log(email, "received email")

        // find the user using the email in the database 
        const emailFromDb = await getUserByEmail(email);
        const { fName } = emailFromDb;
        console.log(fName, "fName")

        if (!emailFromDb) {
            next({
                statusCode: 404,
                messasge: "Email Not Found!"
            })
        }

        // sending the Otp to user email
        await sendOTP({ email: email, fName: fName, Otp: Otp })
        await insertOTP({ associate: email, OTP: Otp })
        return res.status(200).json({
            status: "success",
            message: "OTP has been sent to your email!"
        })

    } catch (error) {
        console.log(error)
    }
}
export const verifyOtp = async ({ email, Otp }) => {
    try {
        // get the OTP from database
        const OTPFromDB = await findOTPByAssociate({ associate: email, OTP: Otp })
        if (!OTPFromDB) {
            return "Invalid OTP, Try Again!"
        }
        return res.status(200).json({
            status: "success",
            message: "OTP has been Verified!"
        })
    } catch (error) {
        throw new Error(error.message)
    }
}
// i dont think this is needed in future
export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        // find the user 
        const user = await getUserByEmail(email)

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        const { fName } = user
        return res.status(200).json({
            status: "success",
            message: "OTP has been sent successfully!"
        })

    } catch (error) {
        console.log(error.message, 234)
        return next({
            statusCode: 500,
            message: error.message,
        })
    }
}
// update password
export const updatePassword = async (req, res, next) => {
    try {
        // get the OTP from user
        const { email, Otp, password, confirmPassword } = req.body;

        const isOTPverified = await findOTPByAssociate({ associate: email, Otp: Otp })
        console.log(isOTPverified, 100)

        if (!isOTPverified) {
            return next({
                statusCode: 400,
                message: "Otp Not Verified!"
            })
        }
        const foundUser = await getUserByEmail(associate)
        const isPasswordSame = await compareText(password, foundUser.password)
        if (isPasswordSame) {
            return res.status(404).json({
                status: "error",
                message: "Enter new Password!"
            })
        }
        if (!isPasswordSame) {
            // encryption of the password
            const hashedPw = await encryptText(password)
            const updatedPassword = await updateUser(foundUser._id, { password: hashedPw })

            if (!updatedPassword) {
                next({
                    statusCode: 400,
                    message: "Error in updating Password!"
                })
            }
            // delete the OTP from the database after the use 
            await deleteOTP(isOTPverified._id)
        }

        return res.status(200).json({
            status: "success",
            message: "Password changed successfully!"
        })

    } catch (error) {
        console.log(error.message, "Error")
        return next({
            statusCode: 500,
            message: error.message
        })
    }
}
