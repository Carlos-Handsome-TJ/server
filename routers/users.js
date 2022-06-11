const Router = require('koa-router')
const {models} = require("mongoose");
const {
  login,
  register
} = require('../controller/users')

const router = new Router({prefix: '/user'})

router.post('/login', login)
router.post('/register', register)

module.exports = router