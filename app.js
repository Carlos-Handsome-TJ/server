const Koa = require('koa')
const Router = require('koa-router')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const {connectDatabase} = require('./config')

const userRouter = require('./routers/users')

//连接远程数据库
mongoose.connect(connectDatabase, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => {
    console.log("mongoDB连接成功")
})
//监听数据库连接失败原因
mongoose.connection.on("error", () => {
    console.error()
})
const path = require('path')
const app = new Koa()
const router = new Router()

//生成静态文件目录
app.use(koaStatic(path.join(__dirname, "public")))
//错误处理中间件
app.use(error({
        //默认在开发环境返回所有错误信息，在生产环境不返回堆栈信息
        postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === "production" ? rest : {stack, ...rest}
    }
))
//参数校验中间件
app.use(parameter(app))
//解析请求体中间件
app.use(koaBody({
    //允许上传文件：
    multipart: true,
    formidable: {
        //上传目录：
        uploadDir: path.join(__dirname, "/public/uploads"),
        //保留上传文件的扩展名：
        keepExtensions: true
    },
}))
//路由中间件
app.use(router.routes())
//用户路由
app.use(userRouter.routes())
// //上传文件路由
// app.use(uploadRouter.routes())
// //话题路由
// app.use(topicRouter.routes())
// //文章路由
// app.use(articleRouter.routes())
// //评论路由
// app.use(commentRouter.routes())
app.listen(5000, () => {
    console.log('启动服务端口5000')
})