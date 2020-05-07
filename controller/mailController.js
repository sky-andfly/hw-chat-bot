class mailController {
    constructor() { }

    mailer = message => {
        transporter.sendMail(message, (err, info) => {
            if (err) {
                return console.log(err)
            }
            console.log('Email, ', info)
        })
    }
}

module.exports = { mailController }