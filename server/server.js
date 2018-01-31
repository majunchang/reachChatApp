var express = require('express');
const bodyParser = require('body-parser');
var userRouter = require('./user/user')


const app = express();

app.use(bodyParser.json())
app.use('/user',userRouter)


app.listen(9000, () => {
    console.log('数据库服务已经成功启动，监听的端口号是9000');
})
