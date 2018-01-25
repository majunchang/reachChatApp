var mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/reactChat';

mongoose.connect(url);
mongoose.connection.on('connected', function () {
    console.log('mongodb数据库连接成功')
})