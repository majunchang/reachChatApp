var express = require('express');
var mongoose = require('mongoose');
var userRouter = require('./user/user')
const url = 'mongodb://localhost:27017/reactChat';
mongoose.connect(url);
mongoose.connection.on('connected', function () {
    console.log('mongodb数据库连接成功')
})

const app = express();

app.use('/user',userRouter)

app.get('/', function (req, res) {
    res.send('<h1>hello  world</h1>')
})


app.listen(9000, () => {
    console.log('数据库服务已经成功启动，监听的端口号是9000');
})
