var express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var userRouter = require('./user/user')
const app = express();
//  引入socket.io  并和express搭配使用
const server = require('http').Server(app);
const io = require('socket.io')(server);
const model = require('./model/model');
const Chat = model.getModel('chat')

//  检测身份的标识
let identify = [];


io.on('connection', (socket) => {
    console.log('socket已经连接');
    socket.on('sendmsg', (data) => {
        // identify.push({
        //     talkself:data.talkself,
        //     talkObject:data.talkObject
        // })
        // console.log(data);
        const {from,to,msg} = data;
        const chatId = [from,to].sort().join('_');
        Chat.create({chatId,from,to,content:msg},(err,doc)=>{
            if(!err){
                //  拿到数据以后  通知全局
                io.emit('receMsg',Object.assign({},doc._doc))
            }
        })

    })
})


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)


// app.listen(9000, () => {
//     console.log('数据库服务已经成功启动，监听的端口号是9000');
// })

server.listen(9000, () => {
    console.log('数据库服务已经成功启动，监听的端口号是9000');
})
