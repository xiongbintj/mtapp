//控制器
require('../models/db')
//创建catgory
const Category = require('../models/Category')
//利用数据模型实例化一个集合对象
const Restaurant = require('../models/Restaurant')

exports.homepage = async (req, res) => {
    try {
          //从数据库读取Category集合里的数据：[] 数组
        const categories = await Category.find()
        // const restaurants = await Restaurant.find()
        // const stars = await Restaurant.find().sort({stars:-1}).limit(5)
        // const distances = await Restaurant.find({category:'火锅'}).sort({distance:1}).limit(5)
        res.render('index', { title: "MT外卖 - 首页", categories })
    } catch (error) {
        res.status(500).send(error.message)
    }
}
exports.loadmore = async (req,res) => {
    const skipNum = parseInt(req.body.skipNum)
    const restaurants = await Restaurant.find().skip(skipNum)
    // .limit(2)
   res.json(restaurants)
}

//添加页面get请求(函数)
exports.addRestaurant = async (req, res) => {
    const result1 = req.flash("成功!")
    // const result2 = req.flash('danger',"失败")
    //返回添加餐馆页面get
    res.render('add-restaurant', { title: "添加餐馆 - MT外卖",result})
}
//添加页面post请求(函数)
exports.addRestaurantPost = async (req, res) => {
 //图片名称 图片路径
 let imageUploadFile, uploadPath, newImageName
 //获取图片原始名称
    imageUploadFile = req.files.photo
   //重命名
    newImageName = Date.now()+imageUploadFile.name
    // 确定图片存放的路径
    uploadPath = require("path").resolve("./") +'/public/img/restaurant/'+ newImageName
    console.log(uploadPath)
    //把上传的图片放入指定位置 mv:move 移动
    imageUploadFile.mv(uploadPath)
    try {
        const newRestaurant = new Restaurant({
            name: req.body.name,
            category: req.body.category,
            image: newImageName,
            desc: req.body.intro,
            averageCost: req.body.averageCost,
            promotion: req.body.promotion,
            featured: req.body.featured,
            location: req.body.location
        })
        await newRestaurant.save()
        res.redirect('/add-restaurant')

    } catch (error) {
        res.json(error)
        res.redirect('/add-restaurant')
    }

}
//渲染页面restaurants.ejs,同时要把id传入页面
exports.sortRestaurant = async (req, res) => {
    try {
        //从数据读取集合里的数据：[]数组
        //req请求对象 params路径的id
        let categoryId = req.params.id
        res.render('restaurants', { title: "MT外卖 - 首页", categoryId })
    } catch (error) {
        res.status(500).send(error.message)
    }
}
exports.sortRestaurantPost = async (req, res) => {
    try {
        let categoryId = req.params.id
        const restaurantList = await Restaurant.find({'category':categoryId})
   
        res.json(restaurantList)
    }catch (error) {
        res.status(500).send(error.message)
    }
}
//一个restaurant餐馆的页面
exports.showRestaurant = async (req, res) => {
    try {
        //从数据读取集合里的数据：[]数组
        let categoryId = req.params.id
        const restaurant = await Restaurant.find({"_id": categoryId})
        res.render('restaurant', { title: "MT外卖 - 首页", restaurant })
    } catch (error) {
        res.status(500).send(error.message)
    }
}
//搜索结果
exports.searchPost = async (req, res) => {
    try {
        let keyword = req.body.mykeyword
        const searchResult = await Restaurant.find({$text:{$search:keyword}})
        res.render('search',{title:"搜索结果",searchResult})
      
    }catch (error) {
        res.status(500).send(error.message)
    }
}
