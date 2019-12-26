const Koa = require('koa')
const static = require('koa-static')
const Router = require('koa-router')
const koaBody = require('koa-body')
const { join } = require('path')
const { query } = require('./db/db')
const { addSql } = require('./db/sql/article_sql')


const staticPath = '../static'
const app = new Koa()
const router = new Router()

app.use(koaBody());
app.use(static(join(__dirname, staticPath)))
app.use(router.routes()).use(router.allowedMethods())

router.get('/articleList', async (ctx, next) => {
    let list = await query('SELECT * FROM article;')
    let data = [];
    list.forEach(({ id, title, author, content, createTime }) => {
        data.push({
            id,
            title,
            author,
            content,
            createTime
        })
    })
    ctx.body = {
        code: 0,
        data,
        message: 'get list success'
    }
})

router.post('/add', async (ctx, next) => {
    const params = ctx.request.body
    let result = await query(addSql, params)
    ctx.body = {
        code: 0,
        data: {
            id: result.insertId,
            title: params.title,
        },
        message: 'add success'
    }
})

router.get('/getContent/:id', async (ctx, next) => {
    let result = await query('SELECT * FROM article WHERE id = ?;', ctx.params.id)
    ctx.body = {
        code: 0,
        data: {
            title: result[0].title,
            content: result[0].content
        },
        message: 'get content success'
    }
})

router.put('/update/:id', async (ctx, next) => {
    const postData = ctx.request.body
    await query('UPDATE article SET title = ?, content = ?, author = ? WHERE id = ?;', [postData.title, postData.content, postData.author, postData.id])
    const result = await query('SELECT * FROM article WHERE id = ?;', ctx.params.id)
    ctx.body = {
        code: 0,
        data: result[0],
        message: 'update success'
    }
})

router.post('/delete', async (ctx, next) => {
    const postData = ctx.request.body;
    await query('DELETE FROM article WHERE id = ?;', postData.id)
    ctx.body = {
        code: 0,
        data:{},
        message: 'delete success'
    }
})

app.listen(3000)
console.log('listenning at port 3000')