var express = require('express');
var mongoClient = require("mongodb").MongoClient;
const DB_STR="mongodb://localhost:27017/myblog"
var ObjectId=require("mongodb").ObjectId;
var router = express.Router();

//分类列表
router.get('/', function(req, res, next) {
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
     res.render('admin/category_list',{data:docs});
    });
   })
   });
//添加分类
router.get('/add', function(req, res, next) {
  res.render('admin/category_add');
});
router.post('/add', function(req, res, next) {
  //一、获取表单提交过来的数据
  var title=req.body.title;
  var sort=req.body.sort;
  //二、验证提交过来的数据，省略
  //三、将上面的数据保存到数据库，并完成提示，然后跳转
  // console.log(title,sort)
  mongoClient.connect(DB_STR,function(err,client){
    if(err){
      res.send(err)
      return;
     }
  
    const db =client.db("myblog");
    var c = db.collection("cats");
    c.insert({title:title,sort:sort},function(err,result){
      if(err){
        res.send(err)
      }else{
        res.send("添加分类成功 <a href='/admin/cats'> 查看分类列表 </a>")
      }
    })
   })
   });
//编辑分类
router.get('/edit', function(req, res, next) {
  var id=req.query.id;
  mongoClient.connect(DB_STR,function(err,client){
    if(err){
      res.send(err)
      return;
     }
  
    const db =client.db("myblog");
    var c = db.collection("cats");
    c.find({_id:ObjectId(id)}).toArray(function(err,docs){
      if(err){
        res.send(err)
        return;
      }
     console.log(docs)
     // 成功，则数据和视图一起渲染
     res.render('admin/category_edit',{data:docs[0]});
    });
   })
  });
  //完成编辑分类的具体功能
  router.post('/edit', function(req, res, next) {
    //获取表单提交过来的数据
    var title=req.body.title;
    var sort=req.body.sort;
    var id=req.body.id;
    mongoClient.connect(DB_STR,function(err,client){
      if(err){
        res.send(err)
        return;
       }
    
      const db =client.db("myblog");
      var c = db.collection("cats");
      c.update({_id:ObjectId(id)},{$set:{"title":title,"sort":sort}},function(err,result){
        if(err){
          res.send(err)
        }else{
          res.send("更新成功 <a href='/admin/cats'> 返回分类列表 </a>")
        }
      })
     })
     });

  //删除分类
  router.get('/delete', function(req, res, next) {
    var id=req.query.id;
    mongoClient.connect(DB_STR,function(err,client){
      if(err){
        res.send(err)
        return;
       }
    
      const db =client.db("myblog");
      var c = db.collection("cats");
      c.remove({_id:ObjectId(id)},function(err,result){
        if(err){
          res.send(err)
        }else{
          res.redirect('/admin/cats')
        }
      })
     })
     });
     module.exports = router;