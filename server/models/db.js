const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/haha")
.then(()=>console.log('连接成功'))
.catch(err=>console.error('连接失败'))


