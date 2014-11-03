var mongoose = require('mongoose'),
	Crime = require('../models/Crime');

module.exports = function(envConfig){
	mongoose.connect(envConfig.database);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
	  console.log('Connected to database');
	});
}