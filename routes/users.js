var express = require('express');
var router = express.Router();
var userModel = require('../model/users');
var utils = require('../utils');
var flash = require('connect-flash');
var auth = require('../middleware/auth');//引入权限验证中间件
/* GET users listing. */
router.get('/login',auth.checkNotLogin, function (req, res, next) {
    res.render('users/login', {title: '登录'});
});

router.post('/login',auth.checkNotLogin, function (req, res, next) {
    var user = req.body;
    var username = user.username;
    var password = utils.md5(user.password);
    userModel.findOne({username: username, password: password}, function (err, doc) {
        if (err) {
            reg.flash('error','登录失败');
            res.redirect('back');
        } else {
            if (doc) {//登录成功后，将数据写入session
                req.session.user = doc;
                req.flash('success','登录成功');
                res.redirect('/');
            } else {
                req.flash('error','用户名或密码错误');
                res.redirect('back');
            }
        }
    });
});
router.get('/reg',auth.checkNotLogin, function (req, res, next) {
    res.render('users/reg', {title: '注册'});
});
router.post('/reg',auth.checkNotLogin, function (req, res, next) {
    req.body.password = utils.md5(req.body.password);
    userModel.create(req.body, function (err, doc) {
        if(err){
            reg.flash('error','注册失败');
            res.redirect('back');
        }else{
            req.flash('success','注册成功');
            res.redirect('/users/login');
        }

    });
});
router.get('/logout',auth.checkLogin, function (req, res, next) {
    req.session.user = null;
    req.flash('success','退出成功');
    res.redirect('/');
});

module.exports = router;
