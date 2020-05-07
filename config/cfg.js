nodemailer = require('nodemailer')
TelegramBot = require('node-telegram-bot-api')

token = '1196831663:AAEDnTooyySD3rML2PTaFn6jzFCR-NY9Di0'
bot = new TelegramBot(token, { polling: true })

mailTo = 'coo@hwschool.online' //coo@hwschool.online

transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'deadboy7967@gmail.com',
            pass: 'xsueeanevgcttupn'
        }
    },
    {
        from: `Телеграм чат бот deadboy7967@gmail.com`
    }
)

utf8 = require('utf8')