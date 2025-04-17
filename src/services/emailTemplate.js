

export const userActivationEmailTemplate = ({ email, userName, url }) => {
    return ({
        from: `${process.env.COMPANY_NAME} <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Action Required! User Activation Required!",
        text: `Dear, ${userName}! Click the link to activate your account. ${url}`,
        html: `<div style = "text-align : center; width: 100%">
        <h1>Hello ${userName},</h1>
        <p>Please click the button to verify your account!</p> 
        <a href = ${url}><button style = "display: inline-block; padding : 10px 20px; background : blue; text-decoration: none; border-radius : 5px;font-size: 16px; font-weight: bold; color: white">Verify</button></a>
        <br/>
        <p>Regards</p>
        <p>Ram<p/>
        <p>Manager</p>
        <p>${process.env.COMPANY_NAME}</p>
        </div>`
    })
}



export const sendingOTP = ({ email, fName, Otp }) => {
    return ({
        from: `${process.env.COMPANY_NAME} <${process.env.SMTP_USER}>`,
        to: email,
        subject: "OTP!!",
        html: `<div style = "text-align : center; width: 100%">
        <h1>Hello ${fName},</h1>
        <p>Please enter the given OTP to change your password!</p> 
       <span style = "border : 1px solid black; padding: 10px 20px; background : white; color: black">${Otp}</span>
        <p>Regards</p>
        <p>Ram<p/>
        <p>Manager</p>
        <p>${process.env.COMPANY_NAME}</p>
        </div>`
    })
}