const express = require('express');
const Router = express.Router();
const model = require('../model/model');
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility');


const error_code = 500;
const success_code = 0;

const filter = {'pwd': 0, '__v': 0}


//  有时候当用户设置了比较简单的密码的时候  容易被破解 所以我们使用加盐操作
function md5Salt(pwd) {
    const salt = 'majunchang_good_hope_money&love_!@wQWEWQ123' + pwd;
    return utils.md5(utils.md5(salt));
}


Router.get('/list', (req, res) => {
    //  执行清空数据库中 所有用户的代码
    // User.remove({}, function (err, doc) {
    //
    // })
    //  get的方式 使用query接收
    const {type} = req.query

    User.find({type}, (err, doc) => {
        return res.json({
            code: 0,
            data: doc
        })
    })
})


Router.post('/register', (req, res) => {
    // console.log(req.body)
    // console.log('刘亦菲');
    // console.log(req.body.user);
    const {user, pwd, type} = req.body;
    User.findOne({user}, (err, doc) => {
        //  先看 是否有报错 然后看是否有重复的地方
        if (err) {
            console.log(err);
            return res.json({
                code: error_code,
                msg: '服务器报错了'
            })
        }
        if (doc) {
            return res.json({
                code: error_code,
                msg: '用户名已经注册过，请直接登录'
            })
        }
        //  使用 User.create的方式  无法获取到_id  信息  所以我们改为 save的方式
        const userModel = new User({user, type, pwd: md5Salt(pwd)});
        userModel.save()
            .then((d) => {
                const {user, type, _id} = d;
                res.cookie('userId', _id)
                return res.json({
                    code: success_code,
                    data: {user, type, _id}
                })
            }).catch((e) => {
            if (e) {
                return res.json({
                    code: error_code,
                    msg: '添加用户失败'
                })
            }
            //  获取相关信息
        })
    })
})

Router.post('/login', (req, res) => {
    const {user, pwd} = req.body;
    User.findOne({user, pwd: md5Salt(pwd)}, filter, (err, doc) => {
            if (err) {
                console.log(err);
                return res.json({
                    code: error_code,
                    msg: '服务器正在维护'
                })
            }
            // console.log(doc);
            if (!doc) {
                return res.json({
                    code: error_code,
                    msg: '用户名或者密码输入有误,请重新输入'
                })
            }
            res.cookie('userId', doc._id)
            return res.json({code: success_code, data: doc})
        }
    )
})

// 当用户 上传了头像以后
Router.post('/saveInfo', (req, res) => {
    console.log('上传头像之后的发生的事情');
    const userId = req.cookies.userId;
    if (!userId) {
        return res.json({
            code: 1,
            msg: '登录已经失效'
        })
    }
    const body = req.body;
    User.findByIdAndUpdate(userId, body, (err, doc) => {
        if (err) {
            return res.json({
                code: error_code,
                msg: '服务器正在维护之中'
            })
        }
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({
            code: success_code,
            data: data
        })
    })

})


Router.get('/info', (req, res) => {
    //  获取用户传输的cookie
    const {userId} = req.cookies;
    if (!userId) {
        return res.json({
            code: 1,
            msg: '登录已经失效'
        })
    }
    User.findOne({_id: userId}, filter, (err, doc) => {
        if (err) {
            return res.json({
                code: error_code,
                msg: '服务器正在维护之中'
            })
        }
        if (doc) {
            return res.json({
                code: 0,
                data: doc
            })
        }

    })
})


Router.get('/getMsgList', (req, res) => {
    const user = req.cookies.userId;
    // console.log(user);
    //  查询所有的用户 并将其返回
    User.find({}, function (e, userDoc) {
        let users = {}
        userDoc.forEach((v) => {
            users[v._id] = {
                name: v.user,
                avatar: v.avatar
            }
        })
        Chat.find({'$or': [{from: user}, {to: user}]}, (err, doc) => {
            if (!err) {
                return res.json({
                    code: success_code,
                    msgs: doc,
                    users: users
                })
            }
        })
    })
})

Router.post('/user/readmsg', (req, res) => {
    const userid = req.cookies.userId;
    const {to} = req.body;
    //  from和to  是我发给别人  而我更新未读消息 是 别人发送给我的
    Chat.update({from: to, to: userid}, {'$set': {read: true}}, function (err, doc) {
        if (!err) {
            return res.json({code: 0})
        }
        return res.json({code: 500, msg: '修正未读消息数量失败'})
    })
})


module.exports = Router