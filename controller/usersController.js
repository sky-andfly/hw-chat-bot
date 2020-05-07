const { db } = require('../config/db.js')

class userController {
    constructor(user) {
        this.connect = new db
        this.sql = this.connect.getConnection()
        this.user = user
    }
    getUserWithTelegramId = () => {
        var that = this,
            userId = that.user.id,
            getUserSQL = "SELECT * FROM `users` WHERE `users_teleg_id` = ?",
            success,
            promise = new Promise(function (resolve, reject) {
                that.sql.query(getUserSQL, userId, function (err, results) {
                    if (err) resolve(err)
                    else {
                        if (results.length > 0) {
                            success = {
                                data: results[0],
                                status: 'findeduser'
                            }
                            resolve(success)
                        } else {
                            that.addUser().then(function (value) {
                                resolve(value)
                            })

                        }
                    }
                })
            })
        return promise
    }
    addUser = () => {
        var that = this
        console.log(that.user);
        var promise = new Promise(function (resolve, reject) {
            let addUser = `INSERT INTO users(
                users_id, 
                users_teleg_id, 
                users_first_name, 
                users_last_name, 
                users_login, 
                users_current_step) 
               VALUES(?, ?, ?, ?, ?, ?)`,
                userInfo = [
                    ,
                    that.user.id,
                    that.user.first_name ? utf8.encode(that.user.first_name) : utf8.encode('Нет имени'),
                    that.user.last_name ? utf8.encode(that.user.last_name) : utf8.encode('Нет фамилии'),
                    that.user.username ? that.user.username : utf8.encode('Нет логина'),
                    0
                ]
            that.sql.query(addUser, userInfo, function (err, results) {
                if (err) resolve(err)
                else {
                    that.getUserWithTelegramId().then(function (value) {
                        resolve(value)
                    })
                }
            })
        })
        return promise
    }
    changeStep = () => {
        var that = this,
            userId = that.user.id,
            newStep = "UPDATE `users` SET `users_current_step` = `users_current_step` + 1 WHERE `users_teleg_id` = ?",
            success,
            promise = new Promise(function (resolve, reject) {
                that.sql.query(newStep, userId, function (err, results) {
                    if (err) resolve(err)
                    else {
                        success = {
                            data: results,
                            status: 'changedstep'
                        }
                        resolve(success)
                    }
                })
            })
        return promise
    }
}

module.exports = { userController }