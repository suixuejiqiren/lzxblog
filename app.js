var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/home/index');
var users = require('./routes/admin/users');
var posts = require('./routes/home/posts');
var admin = require('./routes/admin/admin');
var cats = require('./routes/admin/cats');
var article = require('./routes/admin/posts');
var app = express();
var session = require("express-session")
app.use(session({
  secret:'blog',
  resave:false,
  saveUninitialized:true,
  cookie:{}
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require('ejs').__express);
app.set('view engine','html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/admin')));

app.use('/', index);
app.use('/users', users);
app.use('/posts', posts);
//实现后台页面的一级路由
app.use('/admin/index',checkLogin);
app.use('/admin/index',admin);
//实现后台页面的分类路由
app.use('/admin/cats',checkLogin);
app.use('/admin/cats',cats);
//实现后台文章的路由
app.use('/admin/posts',checkLogin);
app.use('/admin/posts',article);
//登录路由
app.use('/admin/users',users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//编写一个中间件，用来判断用户是否有权访问
function checkLogin(req,res,next){
  if(!req.session.isLogin){
    res.redirect('/admin/users')
  }
  next();
}

module.exports = app;
