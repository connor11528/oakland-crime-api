var mongoose = require('mongoose'),
	express = require('express'),
	fs = require('fs'),
	path = require('path'),
	Crime = mongoose.model('Crime');

var router = express.Router();

module.exports = function(app, envConfig){

	// API Routes
	// only requests to /api/* will be sent to our "router"
	app.use('/api', router);

	router.get('/crimeTotals', function(req, res){
		res.sendFile(envConfig.rootPath + 'server/data/crimeTotals.json');
	});

	router.get('/crimeCategories', function(req, res){
		var crimeTotals = fs.readFileSync(envConfig.rootPath + 'server/data/crimeTotals.json', "utf8");
		crimeTotals = JSON.parse(crimeTotals);

		res.jsonp(crimeTotals["categories"]);
	});

	// send crimes for police beat
	router.get('/beat/:beat', function(req, res){
		var beat = req.param('beat');
		res.sendFile(envConfig.rootPath + 'server/data/beats/' + beat + '.geojson');
	});

	// ERROR: Heroku Dyno limits: { 1X: 512MB,  2X: 1024MB }
	// ohhhh... also production database
	// query string, send crimes for date range
	router.get('/', function(req, res){

		var start = Date.parse(req.query.start);
		var end = Date.parse(req.query.end);

		// Model.find({"date": {'$gte': new Date('3/1/2014'), '$lt': new Date('3/16/2014')}}, callback);
		Crime.find({ date: { $lte: end, $gt: start } }, function(err, crimes){
			if(err) return err;

			console.log(crimes.length + ' crimes found')

			res.json(crimes);
		})
	});

	router.get('/officerSalaries', function(req, res){
		res.jsonp({ implemented: false })
	});

	router.get('/wrongfulDeaths', function(req, res){
		res.jsonp({ implemented: false })
	});

	router.get('/officerAwards', function(req, res){
		res.jsonp({ implemented: false })
	});

	router.get('/homicideVictims', function(req, res){
		res.jsonp({ implemented: false })
	});

	// Angular routing
	app.get('*', function(req, res){
		res.sendFile(envConfig.rootPath + 'public/index.html')
	});
}