const nodemailer = require('nodemailer');

class SendMail {

  static sendMail(dest, link) {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'fumseck07@gmail.com',
            pass: 'M9*;h+pCBXB3o4.S'
        }
    });

    let info = transporter.sendMail({
        from: '"Fumseck" <fumseck@corporation.com>', // sender address
        to: dest,
        subject: 'Your quiz link', // Subject line
        html: 'Your link : <a href="' + link + '">' + link + '</a>' // html body
    });
  }
}

module.exports = SendMail
