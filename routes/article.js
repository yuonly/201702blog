var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');//引入权限验证中间件
//引入multer处理上传图片
var multer = require('multer');
var storage = multer.diskStorage({
    //指定上传路径
    destination: function (req, file, cb) {
        //注意路径，位置不能写错，文件夹要存在，不然都会报错
        cb(null, 'public/uploads');
    },
    //指定上传文件名
    filename: function (req, file, cb) {
        cb(null, Date.now()+'.'+file.mimetype.slice(file.mimetype.indexOf('/')+1));
    }
})

var upload = multer({ storage: storage });


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
