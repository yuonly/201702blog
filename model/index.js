/**
 * Created by yu on 2017/2/6.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require('./models.js');
var config = require('../config.js');
//链接数据库
mongoose.connect(config.dbUrl);
//注册模型
mongoose.model('users',new Schema(models.userModel));
mongoose.model('articles',new Schema(models.articleModel));

//注册全局Model函数，返回模型实例

global.Model = function(type){

    return mongoose.model(type);
}
