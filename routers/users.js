const Router = require('koa-router')
const {
  login,
  register
} = require('../controller/users')

const router = new Router()

router.post('/login', login)
router.post('/register', register)


router.options('/', ctx => {
  ctx.set('Allow', 'GET, POST, DELETE, PUT, PATCH')
})
module.exports = router