const jsonwebtoken = require('jsonwebtoken')
const {tokenSecret} = require('../config')
const Users = require("../models/users")

module.exports = {
  //登录接口token进行解析：
  auth: async (ctx, next) => {
    let {authorization = ''} = ctx.request.headers
    authorization = authorization.replace('Bearer', '')
    try {
      ctx.state.user = jsonwebtoken.verify(authorization, tokenSecret)
    } catch (err) {
      ctx.throw(401, err.message)
    }
    await next()
  },
  //校验用户是否存在：
  checkUserExist: async (ctx, next) => {
    const user = await Users.findOne(ctx.param.id)
    if (!user) {
      ctx.throw(404, '该用户不存在！')
    }
    await next()
  }
}