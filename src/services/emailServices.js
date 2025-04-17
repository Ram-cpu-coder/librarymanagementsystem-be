import { sendingOTP, userActivationEmailTemplate } from "./emailTemplate.js"
import { eTransporter } from "./emailTransport.js";

export const userActivationEmail = async (obj) => {
    const info = await eTransporter().sendMail(userActivationEmailTemplate(obj))
    return info.messageId;
}

export const sendOTP = async ({ email, fName, Otp }) => {
    const info = await eTransporter().sendMail(sendingOTP({ email, fName, Otp }))
    return info.messageId
}