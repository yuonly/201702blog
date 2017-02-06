var express = require('express');
//引入markdown
var markdown = require('markdown').markdown;
//生成路由的实例
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //                         将article中的关联user到对应的users集合中获取用户数据对象

    Model('articles').find({}).populate('user').exec(function(err,articles){
        articles.forEach(function(article){
            //将content内容的markdown语法转化为html
            article.content = markdown.toHTML(article.content);
        })
        res.render('index',{articles:articles});
    })
});

module.exports = router;
