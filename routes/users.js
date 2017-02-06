var express = require('express');
var router = express.Router();
var userModel = require('../model/users');
var utils = require('../utils');
/* GET users listing. */
router.get('/login', function (req, res, next) {
    res.render('users/login', {title: '登录'});
});
router.post('/login', function (req, res, next) {
    var user = req.body;
    var username = user.username;
    var password = utils.md5(user.password);
    userModel.findOne({username: username, password: password}, function (err, doc) {
        if (err) {
            res.redirect('back');
        } else {
            if (doc) {
                console.log('登录成功');
            } else {
                res.redirect('back');
            }
        }
    });
});
router.get('/reg', function (req, res, next) {
    res.render('users/reg', {title: '注册'});
});
router.post('/reg', function (req, res, next) {
    req.body.password = utils.md5(req.body.password);
    userModel.create(req.body, function (err, doc) {
        console.log(doc);
        res.redirect('/users/login');
    });
});
router.get('/logout', function (req, res, next) {
    res.render('index', {title: '退出'});
});
module.exports = router;
