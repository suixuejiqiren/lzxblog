var express = require('express');
var mongoClient = require("mongodb").MongoClient;
const DB_STR="mongodb://localhost:27017/myblog"
var router = express.Router();

/* GET home page. */
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
        var cl = db.collection("cats");
        cl.find().toArray(function(err,result){
          if(err){
            res.send(err)
            return;
          }
         
       // 成功，则数据和视图一起渲染
       res.render('home/index',{data:docs,data1:result});
      });
     });
    })
});
module.exports = router;
