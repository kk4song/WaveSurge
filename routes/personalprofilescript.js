// personal profile javascript filevar express = require('express');
var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

const url = 'mongodb://localhost:27017';
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('NEW PAGE RENDERED');
  res.render('personalprofile');
});

module.exports = router;