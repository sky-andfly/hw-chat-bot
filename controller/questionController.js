const { db } = require('../config/db.js')

class questionController {
    constructor(user) {
        this.connect = new db
        this.sql = this.connect.getConnection()
        this.user = user.data
        this.buttonText = []
    }
    sendQuestions = () => {
        var that = this,
            currentStep = that.user.users_current_step,
            success,
            promise = new Promise(function (resolve, reject) {
                that.getAllQuestions(currentStep).then(result => {
                    var questions = result.data[0],
                        user = that.user
                    that.getAllButtons(questions.questions_buttons).then(result => {
                        if (result) {
                            //если есть то цепляю их
                            bot.sendMessage(
                                user.users_teleg_id,
                                questions.questions_text,
                                result
                            )
                            success = {
                                question: questions,
                                status: 'stopquestions'
                            }
                        } else {
                            bot.sendMessage(
                                user.users_teleg_id,
                                questions.questions_text
                            )
                            success = {
                                question: questions,
                                status: 'sendedquestion'
                            }
                        }
                        resolve(success)
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(err => {
                    console.log(err)
                })
            })
        return promise
    }
    getAllQuestions = (step, getQuestionById = false) => {
        var that = this
        if (!getQuestionById) {
            var getQuestionsSQL = "SELECT * FROM `questions` WHERE `questions_step` > '?' LIMIT 1"
        } else {
            var getQuestionsSQL = "SELECT * FROM `questions` WHERE `questions_step` = '?'"
        }
        var success,
            promise = new Promise(function (resolve, reject) {
                that.sql.query(getQuestionsSQL, step, function (err, results) {
                    if (err) resolve(err)
                    else {
                        if (results.length > 0) {
                            success = {
                                data: results,
                                status: 'getedquestions'
                            }
                            resolve(success)
                        } else {
                            getQuestionsSQL = "SELECT * FROM `questions` ORDER BY `questions_step` DESC LIMIT 1"
                            that.sql.query(getQuestionsSQL, function (err, results) {
                                if (err) resolve(err)
                                else {
                                    success = {
                                        data: results,
                                        status: 'getedquestions'
                                    }
                                    resolve(success)
                                }
                            })
                        }
                    }
                })
            })
        return promise
    }
    getAllButtons = (buttonId) => {
        var that = this,
            getButtonsSQL = "SELECT * FROM `question_buttons` WHERE `question_buttons_id` = ?",
            promise = new Promise(function (resolve, reject) {
                that.sql.query(getButtonsSQL, buttonId, function (err, results) {
                    if (err) resolve(err)
                    else {
                        if (results.length > 0) {
                            var button = results[0].question_buttons_texts.split(','),
                                getTextForButton = ''
                            for (var key in button) {
                                if (key == 0) {
                                    getTextForButton = "SELECT * FROM `buttons` WHERE `buttons_id` = " + button[key]
                                } else {
                                    getTextForButton += " UNION SELECT * FROM `buttons` WHERE `buttons_id` = " + button[key]
                                }
                            }
                            that.sql.query(getTextForButton, function (err, results) {
                                if (err) console.log(err)
                                else {
                                    var button_opt = [],
                                        texts = results
                                    for (var key in texts) {
                                        button_opt.push([
                                            {
                                                text: texts[key].buttons_text,
                                                callback_data: texts[key].buttons_callback
                                            }
                                        ])
                                    }
                                    var completeButton = {
                                        reply_markup: JSON.stringify({
                                            inline_keyboard: button_opt
                                        })
                                    }
                                    resolve(completeButton)
                                }
                            })
                        } else {
                            resolve(false)
                        }
                    }
                })
            })
        return promise
    }
    getButtonData = (buttonId) => {
        var that = this,
            getButtonsSQL = "SELECT * FROM `buttons` WHERE `buttons_id` = ?",
            promise = new Promise(function (resolve, reject) {
                that.sql.query(getButtonsSQL, buttonId, function (err, results) {
                    if (err) resolve(err)
                    else {
                        resolve(results[0])
                    }
                })
            })

        return promise
    }
    getButtonAltQuestion = (altQuestionId) => {
        var that = this,
            getButtonsAltSQL = "SELECT * FROM `questions_alt` WHERE `questions_alt_id` = ?",
            user = that.user,
            promise = new Promise(function (resolve, reject) {
                that.sql.query(getButtonsAltSQL, altQuestionId, function (err, results) {
                    if (err) resolve(err)
                    else {
                        var altQuestion = results[0]
                        that.getAllButtons(altQuestion.questions_alt_buttons).then(result => {
                            if (result) {
                                bot.sendMessage(
                                    user.users_teleg_id,
                                    altQuestion.questions_alt_text,
                                    result
                                )
                            } else {
                                bot.sendMessage(
                                    user.users_teleg_id,
                                    altQuestion.questions_alt_text
                                )
                                
                            }
                            resolve(altQuestion)
                        })
                    }
                })
            })
        return promise
    }
    getLastStepQuestion = () => {
        var that = this,
            getLastSQL = "SELECT `questions_step` FROM `questions` ORDER BY `questions_step` DESC LIMIT 1",
            promise = new Promise(function (resolve, reject) {
                that.sql.query(getLastSQL, function (err, results) {
                    if (err) resolve(err)
                    else {
                        var success = {
                            data: results,
                            status: 'getedlaststep'
                        }
                        resolve(success)
                    }
                })
            })
        return promise
    }
}

module.exports = { questionController }