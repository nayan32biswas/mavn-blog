const nodeMailer = require('nodemailer');

const KEYS = require("../keys");

exports.sendConfirmationEmail = (to, data = {}) => {
    let transporter = nodeMailer.createTransport(KEYS.EMAIL_CONF);
    let mailOptions = {
        to: to,
        subject: "Registration complete.",
        html: '<h1>Welcome</h1><p>That was easy!</p>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
}

exports.sendVerificationEmail = (to, data = {}) => {
    let transporter = nodeMailer.createTransport(KEYS.EMAIL_CONF);
    let mailOptions = {
        to: to,
        subject: "Email Verification.",
        html: `<a href=\'${process.env.HOST}/verification/email/?token=${data.token}\'>Click here</a><p>That was easy!</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
}