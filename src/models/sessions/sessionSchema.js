
import mongoose from "mongoose";

// base session
const baseSessionSchema = {
    token: {
        type: String,
        required: true,
    },
    associate: {
        type: String,
        default: "",
    }
}

// OTP schema
const otpSchema = new mongoose.Schema({

    OTP: {
        type: Number,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: new Date(Date.now() + 36000),
        expires: 0
    },
    associate: {
        type: String,
        required: true
    }

}, { timestamps: true })

// login session 
const sessionSchema = new mongoose.Schema(baseSessionSchema, { timestamps: true })

// registering session
const registerSessionSchema = new mongoose.Schema({
    ...baseSessionSchema,
    createdAt:
    {
        type: Date,
        default: new Date(Date.now() + 36000),
        expires: 0
    }
})

// otpSession 
const OTPSchema = mongoose.model("OTP", otpSchema)


const SessionSchema = mongoose.model("Sessions", sessionSchema)

const RegisterSessionSchema = mongoose.model("RegisterSessions", registerSessionSchema)


// for login session

export const insertToken = (token) => {
    return SessionSchema(token).save()
}
export const findToken = (token) => {
    return SessionSchema.findOne({ token })
}

// for register session
export const insertRegisterToken = (token) => {
    return RegisterSessionSchema(token).save()
}
export const findRegisterToken = (token) => {
    return RegisterSessionSchema.findOne({ token })
}
export const findRegisterSessionById = (id) => {
    return RegisterSessionSchema.findById(id)
}

// for OTP session
export const insertOTP = (otpObj) => {
    return OTPSchema(otpObj).save()
}

export const findOTPByAssociate = ({ filterObj }) => {
    return OTPSchema.findOne({ filterObj })
}

export const deleteOTP = (_id) => {
    return OTPSchema.deleteOne({ _id })
}