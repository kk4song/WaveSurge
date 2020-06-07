var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var userInfo = require('./login');
const url = 'mongodb://localhost:27017';

router.get('/', function(req, res, next) {
	console.log('NEW PAGE RENDERED');
	res.render('newOrginization');
	console.log(userInfo.user);
});

router.post('/new', function(req, res, next){
	var code = req.body.orginizationCode;
	var name = req.body.orginizationName;
	var newOrginization = true;
	mongo.connect(url,{ useUnifiedTopology: true }, function(err, db) {
		assert.equal(null, err);
		var dbo = db.db("orginizations");
		dbo.collection("orginizations").find({}).toArray(function(err, result) {
			if (err) throw err;
		  	for (var i = 0; i <result.length; i++){
				if (code === result[i].code){
			  		newOrginization = false;
				}
			}
		});
		console.log(newOrginization);
		if(newOrginization){
			console.log(code);
			var orginization = {
				code: code,
				name: name
			};
			dbo.collection('orginizations').insertOne(orginization, function(err, result) { 
				// if (err) throw err;
				console.log('New Orginization has been added');
			});
			var dbn = db.db(code);
			dbn.collection(code).insertOne(userInfo.user, function(err, result){
				// if (err) throw err;
				console.log("user has been added to the orginization database");
			});
			var dbu = db.db("user-data");
			var find ={ username: userInfo.user.username};
			var update = { $set:{orginization: userInfo.user.orginization + code}};
			console.log(update);
			dbu.collection("user-data").updateOne(find, update, function(err, res) {
				// if (err) throw err;
				console.log("1 document updated");
			});
			res.redirect('/login');
		}else{
			console.log("This orginization code is already in use");
			res.redirect('/home');
		}
	});
});

router.get('/joining', function(req, res, next){
	res.render('joinOrginization');
});

router.post('/joinsOrginization', function(req, res, next){
	var code = req.body.orginizationCode;
	var newOrginization = false;
	mongo.connect(url,{ useUnifiedTopology: true }, function(err, db) {
		assert.equal(null, err);
		var dbo = db.db("orginizations");
		dbo.collection("orginizations").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
		  	for (var i = 0; i <result.length; i++){
				console.log(result[i].code);
				if (code === result[i].code){
			  		newOrginization = true;
				}
			}
			console.log(newOrginization);
			if(newOrginization){
				var dbn = db.db(code);
				dbn.collection(code).insertOne(userInfo.user, function(err, result){
					// if (err) throw err;
					console.log("user has been added to the orginization database");
				});
				var dbu = db.db("user-data");
				var find ={ username: userInfo.user.username};
				var update = { $set:{orginization: userInfo.user.orginization + code}};
				console.log(update);
				dbu.collection("user-data").updateOne(find, update, function(err, res) {
					// if (err) throw err;
					console.log("1 document updated");
				});
				res.redirect('/login');
			}else{
				console.log("This orginization code is NOT used yet");
				res.redirect('/home');
			}
		});
	});
});
module.exports = router;