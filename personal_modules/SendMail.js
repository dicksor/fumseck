const nodemailer = require('nodemailer');

class SendMail {

  static sendMail(dest, link, title) {

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
        from: '"Fumseck" <fumseck@corporation.com>',
        to: dest,
        subject: 'Your quiz link (' + title + ')',
        text: 'Your link for ' + title + ' : ' + link,
        html: 'Your link for ' + title + ' : <a href="' + link + '">' + link + '</a>'
    });
  }
}

module.exports = SendMail
