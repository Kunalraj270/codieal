const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment , email , user) => {
    console.log('inside newComment mailer', comment);
    let htmlString = nodeMailer.renderTemplate({comment : comment} , './comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
       from: 'kunalraj2999@gmail.com',
       to: 'kunalraj2999@gmail.com',
       subject: "New Comment Published!",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}