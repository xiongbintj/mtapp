//引用插件
const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const fileUpload = require('express-fileupload')
const flash = require('connect-flash')
const cookieParser = require("cookie-parser")
const session = require("express-session")
//创建服务器
const app = express()
const port = process.env.PORT || 5000

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(expressLayouts);
//引用上传文件插件
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}))
app.use(cookieParser('餐馆cookie'));
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(flash());

app.set('layout', "./layouts/main")
const routes = require('./server/routes/mtRoutes.js')
app.use('/', routes)


//监听
app.listen(port, () => {
    console.log('端口' + port + '亦被监听')
})

