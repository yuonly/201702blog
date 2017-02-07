var express = require('express');
//引入markdown
var markdown = require('markdown').markdown;
//生成路由的实例
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //将article中的关联user到对应的users集合中获取用户数据对象
    var keywords = req.query.keywords;
    var options = {};
    if(keywords){
        options.title = new RegExp(keywords,'i');
    }

    //分页功能
    var page = parseInt(req.query.page) || 1;//获取当前第几页
    var pageSize = 1;//每页显示两条

    //skip跳过几条记录，limit显示几条记录
    Model('articles').find(options).skip(page*pageSize-1).limit(pageSize).populate('user').exec(function(err,articles){
        articles.forEach(function(article){
            //将content内容的markdown语法转化为html
            article.content = markdown.toHTML(article.content);
        })
        //计算一共多少页
        Model('articles').count(options,function(err,count){
            var totalPage = count;//总页数
            res.render('index',{page:page,totalPage:totalPage,articles:articles,keywords:keywords});
        })

    })
});

module.exports = router;
