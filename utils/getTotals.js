var _ = require('lodash'),
	fs = require('fs'),
	q = require('q'),
	readCrimes = require('./readCrimes'),
	outputPath = require('path').join(__dirname, '../public/data/crimeTotals.json');

var beats = [];
var crimeTypes = [];
var categories = [];
var dfd = q.defer();

console.log('Reading a big csv file, sit tight...');

readCrimes(function(crime){

	// get police beats
	if(!_.contains(beats, crime.Beat)){
		beats.push(crime.Beat)
	}

	// get crime types
	if(!_.contains(crimeTypes, crime.CType)){
		crimeTypes.push(crime.CType);
	}

	// get crime categories
	if(!_.contains(categories, crime.CrimeCat)){
		categories.push(crime.CrimeCat);
	}

}, function(){
	console.log('Process finished');
	dfd.resolve({
		beats: beats,
		crimeTypes: crimeTypes,
		categories: categories
	});
});

// write to file
dfd.promise.then(function(totals){

	var output = fs.createWriteStream(outputPath);
	output.write(JSON.stringify(totals, null, 4));
	output.end();
	console.log('Promise resolved!');
	console.log('Crime totals data written to ' + outputPath);
});







