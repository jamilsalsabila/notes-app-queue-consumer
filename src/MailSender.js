const nodemailer = require('nodemailer');

class MailSender {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.SMTPHOST,
            port: process.env.SMTPPORT,
            auth: {
                user: process.env.SMTPUSERNAME,
                pass: process.env.SMTPPASSWORD,
            },
        });
    }

    sendEmail(targetEmail, content) {
        const message = {
            from: 'Notes App',
            to: targetEmail,
            subject: 'Ekspor Catatan',
            text: 'Terlampir hasil ekspor catatan',
            attachments: [
                {
                    filename: 'notes.json',
                    content,
                },
            ],
        };

        // return promise yang berisi status pengiriman
        return this._transporter.sendMail(message);
    }
}

module.exports = MailSender;