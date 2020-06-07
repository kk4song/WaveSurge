var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

const url = 'mongodb://localhost:27017';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/newUser',function(req,res,next){

  var repass = req.body.repassword;

  var item ={
    username: req.body.username,
    password: req.body.password,
    orginization: ""
  };

  var unique=true;

  if (repass == item.password){
    mongo.connect(url,{ useUnifiedTopology: true }, function(err, db) {
      assert.equal(null, err);
      var dbo = db.db("user-data");
      dbo.collection("user-data").find({}).toArray(function(err, result) {
        if (err) throw err;
        for (var i = 0; i <result.length; i++){
          if (result[i].username === item.username){
            unique = false;
          }
          console.log(unique);
        }
        console.log("THIS IS "+ unique);
        if (unique){
          dbo.collection('user-data').insertOne(item, function(err, result) { 
            // if (err) throw err;
            console.log('Item inserted');
            res.redirect('/login');
          });
        }else{
          res.render('newUsername');
        }
      });
    });
  }else{
    console.log('Incorrect Password');
    res.render('retryMatching');
  }
});

router.post('/retry',function(req,res,next){
  res.render('index');
})

module.exports = router;