const mysql = require('mysql2/promise')

const host = process.env.HOST;
const username=process.env.USER
const password = process.env.PASSWORD
const DB = process.env.DATABASE;

const pool = mysql.createPool({
    host:host,
    user:username,
    password:password,
    port:3306,
    database:DB
})

module.exports = pool;