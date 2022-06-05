const Koa = require('koa')
const Router = require('koa-router')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')
const error = require('koa-json-error')
const parameter = require('koa-parameter')


const mongoose = require('mongoose')


const path = require('path')

const app = new Koa()
const router = new Router()

app.listen(5000, ()=> {
    console.log('启动服务端口5000')
})