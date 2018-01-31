const express = require('express');
const Router = express.Router();
const model = require('../model/model');
const User = model.getModel('user')
const utils = require('utility');


const error_code = 500;
const success_code = 0;

const filter = {'pwd': 0, '_v': 0}


//  有时候当用户设置了比较简单的密码的时候  容易被破解 所以我们使用加盐操作
function md5Salt(pwd) {
    const salt = 'majunchang_good_hope_money&love_!@wQWEWQ123' + pwd;
    return utils.md5(utils.md5(salt));
}


Router.get('/list', (req, res) => {
    //  执行清空数据库中 所有用户的代码
    User.remove({}, function (err, doc) {

    })
    User.find({}, (err, doc) => {
        return res.json({
            code: 0,
            data: doc
        })
    })
})


Router.post('/register', (req, res) => {
    console.log(req.body)
    // console.log('刘亦菲');
    // console.log(req.body.user);
    const {user, pwd, type} = req.body;
    User.findOne({user}, (err, doc) => {
        console.log('0000');
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
        console.log('111');
        User.create({user, pwd: md5Salt(pwd), type}, (e, d) => {
            if (e) {
                return res.json({
                    code: error_code,
                    msg: '添加用户失败'
                })
            }
            return res.json({
                code: success_code
            })
        })
    })
})

Router.post('/login', (req, res) => {
    const {user, pwd} = req.body;
    User.find({user, pwd}, filter, (err, doc) => {
            if (err) {
                console.log(err);
                return res.json({
                    code: error_code,
                    msg: '服务器正在维护'
                })
            }
            return res.json({code: success_code, data: doc})
        }
    )
})


Router.get('/info', (req, res) => {
    return res.json({
        code: 0,
        num: 1
    })
})


module.exports = Router