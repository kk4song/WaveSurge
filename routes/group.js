var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var userInfo = require('./login');
const url = 'mongodb://localhost:27017';


router.get('/', function(req, res, next) {
  console.log('NEW PAGE RENDERED');
  res.render('group');
  console.log(userInfo.user);
});

module.exports = router;