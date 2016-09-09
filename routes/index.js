var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient; 
var mongoUrl = 'mongodb://localhost:27017/students';
var mongoose = require('mongoose');
var Student = require('../models/students')
mongoose.connect(mongoUrl);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Students' });
});

router.get('/students', function(req, res, next) {

  var studentToAdd = new Student({
    name: 'Paige2',
    gender: 'Female',
    age: 27
  });

  studentToAdd.save();

  Student.find({}, function(error, documents){
    res.json(documents);
  });
 
});


module.exports = router;
