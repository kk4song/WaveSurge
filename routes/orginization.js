var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var userInfo = require('./login');
const url = 'mongodb://localhost:27017';



router.get('/', function(req, res, next) {
  console.log('NEW PAGE RENDERED');
  var orginization = userInfo.orginization;
  console.log(orginization);
  console.log(userInfo.user);
  mongo.connect(url,{ useUnifiedTopology: true }, function(err, db) {
    assert.equal(null, err);
      var dbo = db.db(orginization);
      dbo.collection(orginization).find({}).toArray(function(err, result) {
        console.log(result);
        if (!result || result.length === 0) {
          res.render("orginization", { result: false });  
        }else{
          res.render("orginization", { result: result });
        }
      });
  });
});

router.post('/profile', function(req, res, next){
  res.redirect('/personalprofilescript');
})

module.exports = router;