/**
 * Created by yu on 2017/2/6.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
    userModel:{
        username:String,
        password:String,
        email:String,
        avatar:String
    },
    articleModel:{
        user:{type:ObjectId,ref:'users'},
        title:String,
        content:String,
        createTime:{type:Date,default:Date.now}
    }
}
