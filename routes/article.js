var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');//引入权限验证中间件


/* GET users listing. */
router.get('/add', auth.checkLogin, function (req, res, next) {
    res.render('article/add', {'title': '发表文章'});

});

router.post('/add', auth.checkLogin, function (req, res, next) {
    var article = req.body;
    article.user = req.session.user._id;
    new Model('articles')(article).save(function(err,doc){
        if(err){
            req.flash('error','添加文章失败');
            res.redirect('back');
        }else{
            if(doc){
                req.flash('success','文章添加成功');
                res.redirect('/');
            }
        }
    })

});


module.exports = router;
