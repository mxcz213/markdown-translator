const mysql = require('mysql')
const config = require('./config')

const pool = mysql.createPool(config.mysql)

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if(err){
                reject(err)
            } else {
                conn.query(sql, values, (err, rows) => {
                    if(err){
                        console.log(err)
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                })
                conn.release()
            }
        })
    })
}

module.exports = {
    query
}