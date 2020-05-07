const { db } = require('../config/db.js')

class resetController {
    constructor(user) {
        this.connect = new db
        this.sql = this.connect.getConnection()
        this.user = user
    }
    resetUserSteps = () => {
        var that = this,
            userId = that.user.id,
            changeStep = `UPDATE users SET users_current_step = '0' WHERE users_teleg_id = ${userId}`,
            deleteAnswers = `DELETE FROM answers WHERE answers_user_teleg_id = ${userId}`,
            success,
            promise = new Promise(function(resolve, reject){
                that.sql.query(changeStep, function (err, results) {
                    if (err) resolve(err)
                    else {
                        that.sql.query(deleteAnswers, function (err, results) {
                            if (err) resolve(err)
                            else {
                                success = {
                                    status: 'reset'
                                }
                                resolve(success)
                            }
                        })
                    }
                })
            })
        return promise
    }
}

module.exports = { resetController }