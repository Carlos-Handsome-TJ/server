const Router = require('koa-router')
const {
  findContent
} = require('../controller/content')
const module = require("module");

const router = new Router({prefix: 'user'})

router.get('/', findContent)








module.export = router