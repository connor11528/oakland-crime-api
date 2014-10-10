var mongoose = require('mongoose'),
	Crime = require('./models/Crime');

module.exports = function(){
	mongoose.connect('mongodb://localhost/oakCrime');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
	  console.log('Connected to database')
	});
}