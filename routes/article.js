var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');//引入权限验证中间件
var upload = require('../middleware/multerUpload');//引入封装好的上传中间件


//获得上传功能的中间件方法 upload

/* GET users listing. */
router.get('/add', auth.checkLogin, function (req, res, next) {
    res.render('article/add', {'title': '发表文章'});

});

router.post('/add',auth.checkLogin,upload.single('thumb'), function (req, res, next) {
    var article = req.body;
    article.user = req.session.user._id;
    //如果有上传文件，那么写入模型
    if(req.file){
        var uploadPath = '/uploads/'+req.file.filename;
        article.thumb = uploadPath;
    }

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
