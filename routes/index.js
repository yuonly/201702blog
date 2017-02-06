var express = require('express');
//生成路由的实例
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //                         将article中的关联user到对应的users集合中获取用户数据对象

    Model('articles').find({}).populate('user').exec(function(err,articles){
        res.render('index',{articles:articles});
    })
});

module.exports = router;
