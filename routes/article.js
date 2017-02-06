var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');//引入权限验证中间件


/* GET users listing. */
router.get('/post',auth.checkLogin, function(req, res, next) {
  res.render('index',{'title':'发表文章'});

});



module.exports = router;
