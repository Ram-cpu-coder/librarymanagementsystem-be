

export const userActivationEmailTemplate = ({ email, userName, url }) => {
    return ({
        from: `${process.env.COMPANY_NAME} <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Action Required! User Activation Required!",
        text: `Dear, ${userName}! Click the link to activate your account. ${url}`,
        html: `<div style = "text-align : center; width: 100%">
        <h1>Hello ${userName},</h1>
        <p>Please click the button to verify your account!</p> 
        <a href = ${url}><button style = "background : blue; border-radius : 10px; padding : 0 5px; color: white">Verify</button></a>
        <br/>
        <p>Regards</p>
        <p>Ram<p/>
        <p>Manager</p>
        <p>${process.env.COMPANY_NAME}</p>
        </div>`
    })
}