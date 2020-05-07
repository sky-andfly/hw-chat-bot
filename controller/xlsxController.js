const xlsx = require('xlsx-populate')
const fs = require('fs')
const { mailController } = require('./mailController')

class xlsxController {
    constructor() {
        this.xlsx = xlsx
    }

    createXLSX = (answers, breakpoint, user, stopQuestion = false) => {
        if(stopQuestion){
            answers.push({
                answers_question_text: stopQuestion.text,
                answers_text: stopQuestion.answer
            })
            var subj = utf8.encode('Пользователь не был опрошен'),
                text = utf8.encode(`Пользователь ${user.users_first_name} ${user.users_last_name} не прошел опрос до конца`)
        } else {
            var subj = utf8.encode('Пользователь был опрошен'),
                text = utf8.encode(`Пользователь ${user.users_first_name} ${user.users_last_name} был опрошен ${breakpoint} раз`)
        }
        var userId = user.users_teleg_id
        xlsx.fromFileAsync(`./xlsx/template${breakpoint}.xlsx`)
            .then(workbook => {
                workbook.find(/%name1%+/g, match => user.users_first_name);
                workbook.find(/%name2%+/g, match => user.users_last_name);
                workbook.find(/%login1%+/g, match => user.users_login);
                var i = 1
                for (var key in answers) {
                    var reQue = new RegExp(`%que${parseInt(key) + 1}%+`, 'g')
                    var reAns = new RegExp(`%ans${parseInt(key) + 1}%+`, 'g')
                    workbook.find(reQue, match => answers[key].answers_question_text);
                    workbook.find(reAns, match => answers[key].answers_text);
                    i++
                }
                for(i; i <= 10; i++){
                    var reQue = new RegExp(`%que${i}%+`, 'g')
                    var reAns = new RegExp(`%ans${i}%+`, 'g')
                    workbook.find(reQue, match => '');
                    workbook.find(reAns, match => '');
                }
                if (!fs.existsSync('./users/' + userId)) {
                    fs.mkdirSync('./users/' + userId)
                }
                workbook.toFileAsync(`./users/${userId}/${userId}BR${breakpoint}.xlsx`);
                var messageText = {
                    to: mailTo,
                    subject: subj,
                    text: text,
                    attachments: [
                        {
                            path: `./users/${userId}/${userId}BR${breakpoint}.xlsx`
                        }
                    ]
                }
                var mailC = new mailController()
                return mailC.mailer(messageText)
            });
    }
}

module.exports = { xlsxController }