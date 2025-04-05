import { userActivationEmailTemplate } from "./emailTemplate.js"
import { eTransporter } from "./emailTransport.js";

export const userActivationEmail = async (obj) => {
    const info = await eTransporter().sendMail(userActivationEmailTemplate(obj))
    return info.messageId;
}