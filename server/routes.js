var mongoose = require('mongoose'),
	express = require('express'),
	fs = require('fs'),
	path = require('path'),
	Crime = mongoose.model('Crime');

var router = express.Router();
var root = path.resolve(__dirname, '../public');

module.exports = function(app){

	// API Routes
	// only requests to /api/* will be sent to our "router"
	app.use('/api', router);

	router.get('/crimeTotals', function(req, res){
		res.sendFile('./data/crimeTotals.json', { root: root });
	});

	router.get('/crimeCategories', function(req, res){
		var crimeTotals = fs.readFileSync(root + '/data/crimeTotals.json', "utf8");
		crimeTotals = JSON.parse(crimeTotals);

		res.jsonp(crimeTotals["categories"]);
	});

	// query string
	router.get('/', function(req, res){

		var start = Date.parse(req.query.start);
		var end = Date.parse(req.query.end);

		// Model.find({"date": {'$gte': new Date('3/1/2014'), '$lt': new Date('3/16/2014')}}, callback);
		Crime.find({ date: { $lte: end, $gt: start } }, function(err, crimes){
			if(err) return err;

			res.json(crimes);
		})
	});

	router.get('/officerSalaries', function(req, res){
		res.jsonp()
	});

	router.get('/wrongfulDeaths', function(req, res){
		res.jsonp()
	});

	router.get('/officerAwards', function(req, res){
		res.jsonp()
	});

	router.get('/homicideVictims', function(req, res){
		res.jsonp()
	});

	// Angular routing
	app.get('*', function(req, res){
		res.sendfile('./public/index.html')
	});
}