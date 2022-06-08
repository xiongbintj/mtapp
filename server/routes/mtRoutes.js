//路由器
const express = require('express')
const router = express.Router()
const mtController = require('../controllers/mtController')
//首页页面get请求路由打开,函数homepage
router.get ('/', mtController.homepage)
//上滑加载更多路由打开,函数loadmore
router.post ('/load-more', mtController.loadmore)
//添加页面get请求路由打开，函数addRestaurant
router.get ('/add-restaurant', mtController.addRestaurant)
//添加页面post请求路由打开，函数addRestaurantPost
router.post ('/add-restaurant', mtController.addRestaurantPost)
//渲染页面restaurants.ejs,同时要把id传入页面
//分类：火锅，海鲜……
router.get ('/category/:id', mtController.sortRestaurant)
router.post ('/category/:id', mtController.sortRestaurantPost)
router.get('/restaurants/:id', mtController.showRestaurant)
//查找post请求路由打开
router.post ('/search', mtController.searchPost)
module.exports = router


