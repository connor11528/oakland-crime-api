var fs = require('fs'),
	path = require('path'),
	csv = require('csv-parser'),
	filePath = path.join(__dirname, '../server/data/OPD_140722_1.csv'),
	mongoose = require('mongoose'),
	Crime = require('../server/models/Crime');

// connect to database
var envConfig = require('../server/config/environments')['production'];
var db = require('../server/config/database')(envConfig);

console.log(db)
var startTime = new Date().getTime()/1000;

var readableCrimes = fs.createReadStream(filePath);

readableCrimes
	.pipe(csv())
	.on('data', function(line){
		var crime = line;

		var crime = new Crime({
			idx: line['Idx'],
			opd_rd: line['OPD_RD'],
			date: new Date(line['Date']),
			time: line['Time'],
			crimetype: line['CType'],
			description: line['Desc'],
			beat: line['Beat'],
			address: line['Addr'],
			location: [new String(line['Lat']), new String(line['Long'])],
			statute: line['Statute']
		});

		// save to database
		crime.save(function(err, data){
			if (err) return console.error(err);

			console.log(data)
		});
	})
	.on('end', function(){
		var totalTime = new Date().getTime()/1000 - startTime;
		
		console.log('All crimes in ' + filepath + ' added to database!');
		console.log('Task took ' + totalTime + ' seconds.')
	});