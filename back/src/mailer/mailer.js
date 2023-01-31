const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "ladionisiapf@gmail.com",
        pass: "qxahwjjguqtfgnvb"
    },
})

module.exports = {transporter}