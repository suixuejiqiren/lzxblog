var express = require('express');
var mongoClient = require("mongodb").MongoClient;
const DB_STR="mongodb://localhost:27017/lzxsss"
var ObjectId=require("mongodb").ObjectId;
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var id=req.query.id;
  mongoClient.connect(DB_STR,function(err,client){
    if(err){
      res.send(err)
      return;
     }
     
    var db =client.db("lzxsss");
    var c = db.collection("posts");
    c.find({_id:ObjectId(id)}).toArray(function(err,docs){
      if(err){
        res.send(err)
        return;
      }
     
     // 成功，则数据和视图一起渲染
      res.render('home/article',{data:docs[0]});
    });
    })
  });
module.exports = router;
