var express = require('express');
var mongoClient = require("mongodb").MongoClient;
const DB_STR="mongodb://localhost:27017/myblog"
var ObjectId=require("mongodb").ObjectId;
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    mongoClient.connect(DB_STR,function(err,client){
      if(err){
        res.send(err)
        return;
       }
    
      const db =client.db("myblog");
      var c = db.collection("posts");
      c.find().toArray(function(err,docs){
        if(err){
          res.send(err)
          return;
        }
       
       // 成功，则数据和视图一起渲染
       res.render('admin/article_list',{data:docs});
      });
     })
     });
router.get('/add', function(req, res, next) {
    mongoClient.connect(DB_STR,function(err,client){
        if(err){
          res.send(err)
          return;
         }
      
        const db =client.db("myblog");
        var c = db.collection("cats");
        c.find().toArray(function(err,docs){
          if(err){
            res.send(err)
            return;
          }
         
         // 成功，则数据和视图一起渲染
         res.render('admin/article_add',{data:docs});
        });
       })
  });
  router.post('/add', function(req, res) {
      var cat = req.body.cat;
      var title=req.body.title;
      var summary = req.body.summary;
      var content = req.body.content;
      //发布文章时间
      var time=new Date();
      var post={
          "cat":cat,
          "title":title,
          "summary":summary,
          "content":content,
          "time":time
      }
    mongoClient.connect(DB_STR,function(err,client){
        if(err){
          res.send(err)
          return;
         }
         console.log(post);
        const db =client.db("myblog");
        var c = db.collection("posts");
        c.insert(post,function(err,docs){
          if(err){
            res.send(err)
            return;
          }
         
         // 成功，则数据和视图一起渲染
         res.send("添加文章成功 <a href='/admin/posts'> 查看文章列表 </a>")
        });
       })
  });
  //删除文章
  router.get('/delete', function(req, res, next) {
    var id=req.query.id;
    mongoClient.connect(DB_STR,function(err,client){
      if(err){
        res.send(err)
        return;
       }
    
      const db =client.db("myblog");
      var c = db.collection("posts");
      c.remove({_id:ObjectId(id)},function(err,result){
        if(err){
          res.send(err)
        }else{
          res.redirect('/admin/posts')
        }
      })
     })
     });
module.exports = router;