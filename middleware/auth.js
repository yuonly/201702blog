/**
 * Created by yu on 2017/2/6.
 * 权限控制
 */
//登录后才能访问
exports.checkLogin = function(req,res,next){
    if(req.session.user){
        next();
    }else{
        req.flash('error','请登录后查看');
        res.redirect('/users/login');
    }
}
//没登录时才能访问
exports.checkNotLogin = function(req,res,next){
    if(req.session.user){
        req.flash('error','您已经登录了');
        res.redirect('/');
    }else{
        next();
    }
}

