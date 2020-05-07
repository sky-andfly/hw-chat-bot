const { db } = require('../config/db.js')
const { questionController } = require('./questionController.js')

class answerController {
    constructor() {
        this.connect = new db
        this.sql = this.connect.getConnection()
    }
    saveAnswer = (answer, user, btnText = false) => {
        var that = this
        var promise = new Promise(function (resolve, reject) {
            var questionC = new questionController(user)
            questionC.getAllQuestions(user.data.users_current_step, true).then(function (value) {
                var quest = value
                questionC.getLastStepQuestion().then(function (value) {
                    if (user.data.users_current_step <= value.data[0].questions_step) {
                        that.checkAnswer(user.data.users_teleg_id, quest.data[0].questions_id, user.data.users_current_step).then(function (value) {
                            if (value.status == 'answernotfinded') {
                                var saveAnswSQL = `INSERT INTO answers(
                                                                answers_id, 
                                                                answers_user_teleg_id, 
                                                                answers_question_id, 
                                                                answers_question_step, 
                                                                answers_question_text,
                                                                answers_text,
                                                                answers_date
                                                            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                                    userInf = user.data,
                                    questionInf = quest.data[0],
                                    userId = userInf.users_teleg_id,
                                    questionId = questionInf.questions_id,
                                    questionStep = questionInf.questions_step,
                                    questionText = questionInf.questions_text,
                                    userAnswer = btnText ? btnText : answer.text,
                                    answerDate = answer.date,
                                    sqlValues = [
                                        ,
                                        userId,
                                        questionId,
                                        questionStep,
                                        questionText,
                                        userAnswer,
                                        answerDate
                                    ]
                                that.sql.query(saveAnswSQL, sqlValues, function (err, results) {
                                    if (err) resolve(err)
                                    else {
                                        var success = {
                                            data: questionInf,
                                            isBreakpoint: questionInf.breakpoint,
                                            status: 'answersaved'
                                        }
                                        resolve(success)
                                    }
                                })
                            } else {
                                var success = {
                                    status: 'answeralready'
                                }
                                resolve(success)
                            }
                        })

                    } else {
                        var success = {
                            status: 'questionsend'
                        }
                        resolve(success)
                    }
                })
            })

        })
        return promise
    }
    checkAnswer = (userId, questionId, step) => {
        var that = this,
            checkAnswerSQL = `SELECT * FROM answers WHERE 
                                            answers_user_teleg_id = ${userId}
                                            AND
                                            answers_question_id = ${questionId}
                                            AND
                                            answers_question_step = ${step}`,
            promise = new Promise(function (resolve, reject) {
                that.sql.query(checkAnswerSQL, function (err, results) {
                    if (err) resolve(err)
                    else {
                        if (results.length > 0) {
                            var success = {
                                status: 'answerfinded'
                            }
                        } else {
                            var success = {
                                status: 'answernotfinded'
                            }
                        }
                        resolve(success)
                    }
                })
            })
        return promise
    }
    getAnswersByUser = (userId) => {
        var that = this,
            promise = new Promise(function (resolve, reejct) {
                var getSQL = "SELECT * FROM answers WHERE answers_user_teleg_id = ?"
                that.sql.query(getSQL, userId, function (err, results) {
                    if (err) resolve(err)
                    else {
                        if (results.length > 0) {
                            var success = {
                                data: results,
                                status: 'answerfinded'
                            }
                        } else {
                            var success = {
                                data: NULL,
                                status: 'answernotfinded'
                            }
                        }
                        resolve(success)
                    }
                })
            })
        return promise
    }
}

module.exports = { answerController }