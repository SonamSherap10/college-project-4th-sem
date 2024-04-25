const nodemailer = require("nodemailer")
require("dotenv").config()
const sendEmail = async (options) => {
  var transporter = nodemailer.createTransport({
   service : 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: "Sonam Sherpa",
    to: options.email,
    subject: options.subject,
    text: options.message
  }

  await transporter.sendMail(mailOptions)
} 

module.exports = sendEmail