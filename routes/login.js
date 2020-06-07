var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var user;


const url = 'mongodb://localhost:27017';
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('NEW PAGE RENDERED');
  res.render('logIn');
});

router.post('/log', function(req, res, next) {
  console.log("login");
  // var user ={
  //   username: req.body.username,
  //   password: req.body.password,
  //   number: "0"
  // };
  mongo.connect(url,{ useUnifiedTopology: true }, function(err, db) {
    assert.equal(null, err);
    var dbo = db.db("user-data");
    dbo.collection("user-data").find({}).toArray(function(err, result) {
      for (var i = 0; i < result.length; i++)
      {
        if (req.body.username == result[i].username)
        {
          if (req.body.password == result[i].password)
          {
            user = result[i];
            console.log("This is the result:");
            console.log(user);
            module.exports.user = user; 
            res.redirect('/login/orginization');
          }
          break;
        }
      }
    });
  });
});

router.get('/orginization', function(req,res,next){
  console.log(user);
  var strCode = user.orginization;
  if (strCode === ""){
    res.render('pickOrginization', {orginizations: false});
  }else{
    var code = [""];
    for (var i = 0; i < strCode.length; i+= 4){
      var start = i;
      var end = i+4;
      console.log(strCode.substring(start, end));
      code[i] = strCode.substring(start, end);
    }
    console.log(code);
    res.render('pickOrginization', { orginizations: code });
  }
})

router.post('/pick/:orgin', function(req, res, next){
  console.log(req.params.orgin);
  module.exports.orginization = req.params.orgin;
  res.redirect('/home');
})

module.exports = router;