const Router = require('koa-router')
const {
  findContent
} = require('../controller/content')
const {
  auth,
  checkUserExist
} = require('./middelware')
const module = require("module");

const router = new Router({prefix: 'user'})

router.get('/', auth, checkUserExist, findContent)


module.export = router