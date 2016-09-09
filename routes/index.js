var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient; 
var mongoUrl = 'mongodb://localhost:27017/students';
var db;

mongoClient.connect(mongoUrl, function(error, database){
	if(error){
		console.log(error);
	}else{
		db = database; 
		console.log("Connected to Mongo for students successfully."); 
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Students' });
});

router.get('/students', function(req, res, next) {
  db.collection('students').find().toArray(function(error, results){
  	// req.query = the query string has an object
  	var studentNumber = req.query.student;

  	var studentArray;
  	results.sort(function(a,b){
  		// studentArray = [];
  		// if(error){
  		// 	console.log('student error');
  		// }else{
  		// 	for(var i = 0; i < results.length; i++){
  		// 		studentArray.push(results[i].name);
  		// 		}
  		// }
  		// studentArray.sort();
  		// console.log(studentArray);
  		if(a.name < b.name){
  			return -1;
  		}
  		if(b.name < a.name){
  			return 1;
  		}
  		return(b.name - a.name)
  	});

  	res.render('students', {theStudents:results, whoToHighlight: studentNumber});
  });
});

router.get('/students/reverse', function(req, res, next){
	db.collection ('students').find().toArray(function(error, classResults){
		if(error){
  			console.log('student reverse error');
  			}
		classResults.sort(function(a,b){
			if(b.name < a.name){
  			return -1;
  			}
  			if(a.name < b.name){
  			return 1;
  			}
  			// return(a.name - b.name);
		});
		res.render('students_reverse', {theStudents:classResults});
	});
});

module.exports = router;
