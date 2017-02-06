var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//为了支持会话新增内容
//引入session中间件，req中多了，req.session
var config = require('./config');//引入配置项
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

//flash消息提示模块
var flash = require('connect-flash');

//首页
var index = require('./routes/index');
//用户
var users = require('./routes/users');
//文章
var article = require('./routes/article');

var app = express();



// app.set('env',process.env.ENV);//这样在控制台可以通过 export ENV=product 方便的切换到生产环境，今儿隐藏掉错误详细信息的输出，不让用户看到

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
// app.set('view engine', 'ejs');
app.set('view engine', 'html');
//指定html模板的渲染方法
app.engine('html', require('ejs').__express);

// uncomment after placing your favicon in /public
// 在你把favicon.ico图标放入public目录之后，取消注释
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//日志记录中间件  dev 是日志的格式 可以看node_module/morgan中的Readme.md介绍查看其它格式
app.use(logger('dev'));
//解析请求体，请求体可能是json类型，也可能是查询字符串类型，所以需要两个bodyParser中间件
app.use(bodyParser.json());//处理content-type=json的请求体
app.use(bodyParser.urlencoded({extended: false}));//处理content-type=urlencoded的请求体，extended为true时，表示使用querystring来将请求体的字符串转换成对象。为false时，使用bodyParser自己提供的模块

//cookie处理中间件  req.cookies  res.cookie(key,value)
app.use(cookieParser());
//session依赖cookie，所以要写到cookieParser()下面
app.use(session({
    secret: 'hd',//加密字符串
    resave:true,//每次响应结束后都重新保存session数据
    saveUninitialized:true,//保存新创建但未初始化的session
    store:new mongoStore({//确定session在数据库中的存放位置
        url:config.dbUrl
    })
}));

//启用falsh中间件
app.use(flash());

//用户登录数据分配
app.use(function(req,res,next){
    //res.locals 属性是express模板引擎最后分配的数据对象，因为每个模板都要分配user数据，所以直接写入这个对象即可
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

//处理静态文件服务中间件 指定了一个绝对目录的路径，作为静态文件的根目录
app.use(express.static(path.join(__dirname, 'public')));

//指定路由
app.use('/', index);
app.use('/users', users);
app.use('/article', article);

// catch 404 and forward to error handler
// 捕获404错误，并转发到错误处理中间件
//为什么到这就是404？ 因为路由器都没有捕获到，所以就是页面没有找到
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
//错误处理中间件，如果中间有中间件出错了，那么由他输出
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};//开发环境暴露错误信息，生产环境 res.locals.error = {};隐藏错误对象，不向客户暴露错误信息

    // render the error page
    res.status(err.status || 500);
    //跳转到错误处理页
    res.render('error');
});

module.exports = app;
