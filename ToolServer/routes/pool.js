const mysql = require("mysql")

const option = {
    host:"",
    port:3306,
    user:"app",
    password:"",
    database:"",
    multipleStatements: true,
    connectionLimit:50
};
const pool = mysql.createPool(option);
// console.log(pool)
module.exports = pool;