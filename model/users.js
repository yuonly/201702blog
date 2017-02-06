/**
 * Created by yu on 2017/2/5.
 */

var mongoose = require('mongoose');
//载入配置项
var config = require('../config');
//建立连接
var db = mongoose.connect(config.dbUrl);
//创建集合模型
var userModel = mongoose.model('users',mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
}));

module.exports = userModel;



