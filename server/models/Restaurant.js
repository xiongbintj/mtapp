const mongoose = require("mongoose")
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "餐馆名称待定"

    },
    image: {
        type: String,
        required: true,
        default: "restaurant.jpg"
    },
    starts: {
        type: Number,
        required: false,
        default: "4.0"
    },
    averageCost: {
        type: Number,
        required: true,
        default: "100"
    },
    distance: {
        type: Number,
        required: false,
        default: "2.1"
    },
    location: {
        type: String,
        required: true
    },
    featured: {
        type: String,
        required: true,
       
    },
    promotion: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        required: false

    },
    category: {
        type: String,
        catearr: ["火锅", "快餐", "西餐","甜品","自助","快餐","烧烤","烤鱼",],
        required: true
    }

})

// 创建索引
restaurantSchema.index({ name:"text",desc:"text"})
// 构造函数：构造数据对象
module.exports = mongoose.model("Restaurant", restaurantSchema)