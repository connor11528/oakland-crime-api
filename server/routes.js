var mongoose = require('mongoose'),
	express = require('express'),
	Crime = mongoose.model('Crime');

var router = express.Router();

module.exports = function(app){

	// API Routes
	// only requests to /api/* will be sent to our "router"
	app.use('/api', router);

	// query string
	router.get('/', function(req, res){
		var year = parseInt(req.query.year);
		var start = new Date(year, 0, 1);
		var end = new Date(year, 11, 30);	// leap years..

		Crime.find({ date: { $lte: end, $gt: start } }, function(err, crimes){
			if(err) return err;

			console.log(crimes);
			res.json(crimes);
		})
	});

	// Angular routing
	app.get('*', function(req, res){
		res.sendfile('./public/index.html')
	});
}