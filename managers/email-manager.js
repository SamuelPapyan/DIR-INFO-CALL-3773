const nodemailer = require('nodemailer');
const config = require('../configs/email');

const email = async(to, subject, html) =>{
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:config.user,
            pass:config.pass
        }
    });

    await transporter.sendMail({
        from:'"NodeJS Project" <' + config.user+'>',
        to:to,
        subject:subject,
        html:html
    })
}

module.exports = email;