var express = require('express');
var router = express.Router();
var userModel = require('../model/users');

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('index', { title: '登录' });
});
router.get('/reg', function(req, res, next) {
    res.render('users/reg', { title: '注册' });
});
router.post('/reg',function(req,res,next) {
    req.body.password = require('../utils').md5(req.body.password);
    userModel.create(req.body,function(err,doc){
      console.log(doc);
      res.redirect('/users/login');
    });
});
router.get('/logout', function(req, res, next) {
    res.render('index', { title: '退出' });
});
module.exports = router;
