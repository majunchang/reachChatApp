var express = require('express');
var mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/reactChat';

mongoose.connect(url);
mongoose.connection.on('connected', function () {
    console.log('mongodb数据库连接成功')
})

//  新建一个user的schema
const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: Number, require: true},
}))

User.create({
    user: 'xiaoming',
    age: 12
}, function (err, docs) {
    if (!err) {
        console.log(docs);
    } else {
        console.log(err);
    }
})

const app = express();

app.get('/', function (req, res) {
    res.send('<h1>hello  world</h1>')
})


app.get('/data', (req, res) => {
    User.findOne({user: 'xiaoming'}, (err, doc) => {
        if (!err) {
            res.json(doc)
        } else {
            console.log(err);
        }
    })
})


app.listen(9000,()=>{
    console.log('数据库服务已经成功启动，监听的端口号是9000');
})
