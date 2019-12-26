const { createTable } = require('./sql/article_sql')
const { query } = require('./db')

let initCreateTable = async () => {
    await query(createTable);
    console.log("数据表 article 创建成功")
}

// 初始化所有的建表
try {
    initCreateTable();
} catch(err){
    console.log(err);
}