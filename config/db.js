const mysql = require("mysql2")
const connection = mysql.createPool({
  host: "VH272.spaceweb.ru",
  user: "motion36ru",
  database: "motion36ru",
  password: "Qwer43216"
})
class db {
  constructor() {
    this.connection = connection
  }
  getConnection = () => {
    return this.connection
  }
}

module.exports = { db }