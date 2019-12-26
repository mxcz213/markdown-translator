/**
 * @file article_sql
 */

const createTable = `CREATE TABLE IF NOT EXISTS article(
    id INT AUTO_INCREMENT, 
    title VARCHAR(100) NOT NULL, 
    author VARCHAR(40) NOT NULL, 
    content LONGTEXT,
    createTime DATE,
    PRIMARY KEY (id)
)`;

const addSql = `INSERT INTO article set ?;`;

module.exports = {
    createTable,
    addSql
}