var mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/reactChat';

mongoose.connect(url);
mongoose.connection.on('connected', function () {
    console.log('mongodb数据库连接成功')
})
mongoose.Promise = require('q').Promise;

const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        // 头像 个人简介 职位名称
        'avatar': {type: String},
        'desc': {type: String},
        'title': {type: String},
        //  如果是boss身份
        'company': {type: String, require: true},
        money: {type: String}
    },
    chat: {}
}

for (var key in models) {
    mongoose.model(key, new mongoose.Schema(models[key]))

}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}