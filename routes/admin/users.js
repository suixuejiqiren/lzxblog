var express = require('express');
var mongoClient = require("mongodb").MongoClient;
const DB_STR="mongodb://localhost:27017/myblog"
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/login');
});
//用户登陆处理
router.post('/signin',function(req,res){
    var username=req.body.username;
    var pwd=req.body.pwd;
    mongoClient.connect(DB_STR,function(err,client){
        if(err){
            res.send(err)
            return;
        }
        var db =client.db("myblog");
        var c = db.collection("users");
        c.find({username:username,pwd:pwd}).toArray(function(err,docs){
            if(err){
                res.send(err)
                return;
            }
            if(docs.length){
                //登陆成功了
                req.session.isLogin=true;
                res.redirect('/admin/index')
            }else{
                //登录失败了
                res.redirect('/admin/users')
            }
        })
    });
});
//用户注销操作
router.get('/logout',function(req,res){
    req.session.isLogin=null;
    res.redirect('/admin/users')
});
module.exports = router;
