var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const assert = require('assert');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var groupRouter = require('./routes/group');
var documentsRouter = require('./routes/documents');
var personalprofilescriptRouter = require('./routes/personalprofilescript');
var neworginizationRouter = require('./routes/newOrginization');
var orginizationRouter = require('./routes/orginization');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/grouping',groupRouter);
app.use('/documents',documentsRouter);
app.use('/personalprofilescript',personalprofilescriptRouter);
app.use('/neworginization', neworginizationRouter);
app.use('/orginization', orginizationRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
