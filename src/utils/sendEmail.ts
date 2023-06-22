import { createTransport } from "nodemailer";
import { TEmailReq } from "../interfaces/user.interface";
import AppError from "../errors/AppErrors";
import Mailgen from "mailgen";


class EmailService {
    async sendEmail({to, subject, text}: TEmailReq){
        const transporter = createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        })
        await transporter.sendMail({
            from: "wheelsonsale1@outlook.com",
            to,
            subject,
            html: text,
        }).then(() => {
            console.log("Email send with success.")
        }).catch((err) => {
            console.error(err)
            throw new AppError("Error sending email, please try again later.", 500)
        })
    }

    resetPasswordTemplate(userName: string, userEmail: string, resetToken:string){

        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Wheels on Fire',
                link: 'http://localhost:5173',
                logo: 'https://i.imgur.com/wPvjxFD.png',
                logoHeight: '60px',
            }
        })

        const email = {
            body: {
                name: userName,
                intro: 'You have received this email because a password reset request for your account was received.',
                action: {
                    instructions: 'Click the button below to reset your password:',
                    button: {
                        color: '#4529E6',
                        text: 'Reset your password',
                        link: `http://localhost:5173/resetPassword/${resetToken}`,
                    }
                },
                outro: 'If you did not request a password reset, no further action is required on your part.'
            }
        }

        const emailBody = mailGenerator.generate(email)
        const emailTemplate = {
            to: userEmail,
            subject: "Reset Password",
            text: emailBody,
        }

        return emailTemplate

    }
}

const emailService = new EmailService()

export { emailService }