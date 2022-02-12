const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')

// for sending the email
let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "alcemy.cn22",
        pass: "kunalRaj",
    }
});

// defineing the template
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log('error in redering template');
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter = transporter,
    renderTemplate = renderTemplate
}