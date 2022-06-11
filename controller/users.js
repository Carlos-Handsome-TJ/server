/**
 *
 */

const jsonwebtoken = require('jsonwebtoken')
const Users = require('../models/users')
const {tokenSecret} = require('../config')

class UserController {
  async login(ctx) {
    ctx.verifyParams({
      username: {
        type: 'string',
        require: true
      },
      password: {
        type: 'string',
        require: true
      }
    })
    const {username, password} = ctx.request.body
    const user = await Users.findOne({username, password})
    if (!user) {
      ctx.throw(401, {
        code: 1,
        msg: '用户名或密码不正确！'
      })
    } else {
      const {_id} = user
      const token = jsonwebtoken.sign({
        id: _id,
        username,
        time: Date.now()
      }, tokenSecret, {expiresIn: '1d'})
      ctx.body = {
        token
      }
    }
  }

  async register(ctx) {
    ctx.verifyParams({
      username: {
        type: 'string',
        require: true
      },
      password: {
        type: 'string',
        require: true
      },
      confirm_psw: {
        type: 'string',
        require: true
      }
    })
    const {username, password, confirm_psw} = ctx.request.body
    const isExistUser = await Users.findOne({username})
    if (isExistUser) {
      //用户存在
      ctx.throw(409, {
        msg: "用户已存在！"
      })
    } else {
      const user = await new Users({username, password}).save()
    }
  }
}

module.exports = new UserController()