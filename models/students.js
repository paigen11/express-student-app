var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newStudent = new Schema({
	name: String,
	gender: String,
	age: {type: Number, min: 18, required: true},
	date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Student', newStudent);
//this model takes the name of the collection (student) and the name of the schema (newStudent)  