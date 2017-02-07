/**
 * Created by yu on 2017/2/7.
 */
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

module.exports = multer({ storage: storage });