var Filequeue = require('filequeue');
var fq = new Filequeue(200); // max number of files to open at once

var fs = require('fs-extra');
var _ = require('lodash');
var readCrimes = require('./readCrimes');

var beats = [
  "23X",
  "02X",
  "",
  "22X",
  "03X",
  "99X",
  "03Y",
  "30Y",
  "01X",
  "29",
  "25Y",
  "27Y",
  "34X",
  "30X",
  "10X",
  "16X",
  "24X",
  "18Y",
  "02Y",
  "29X",
  "21Y",
  "04X",
  "20X",
  "26Y",
  "26X",
  "08X",
  "32X",
  "25X",
  "27X",
  "12Y",
  "07X",
  "19X",
  "35X",
  "17X",
  "11X",
  "28X",
  "22Y",
  "33X",
  "26",
  "21X",
  "06X",
  "17Y",
  "24Y",
  "18X",
  "31Y",
  "05X",
  "14X",
  "14Y",
  "32Y",
  "31X",
  "31Z",
  "24",
  "09X",
  "12X",
  "77X",
  "13Z",
  "10Y",
  "13Y",
  "35Y",
  "13X",
  "15X",
  "16Y",
  "05Y",
  "23",
  "21",
  "30",
  "35",
  "18",
  "27",
  "28",
  "20",
  "19",
  "34",
  "15",
  "11",
  "31",
  "03",
  "32",
  "07",
  "08",
  "33",
  "10",
  "8",
  "PDT2",
  "1",
  "13",
  "2",
  "4",
  "22",
  "12",
  "04",
  "06",
  "17",
  "5",
  "02",
  "7",
  "05",
  "16",
  "14",
  "01",
  "6",
  "3",
  "09",
  "25",
  "9",
  "4Y",
  "19Y",
  "15Y",
  "20Y",
  "99x",
  "BERKELEY",
  "LKM1",
  "77x",
  "113Z",
  "88X",
  "B99X",
  "21Z",
  "33O",
  "33Y",
  "327",
  "94605",
  "08Y",
  "1L28",
  "PCW",
  "37Y",
  "45Y",
  "02 X",
  "17 Y",
  "21 Y",
  "O",
  "00",
  "29Y",
  "30 X",
  "27 Y",
  "107",
  "23Y",
  "P3",
  "77XINC"
];

// Error: EMFILE, open '../server/data/beats/1L28.csv'
beats.forEach(function(beat){

	var beatFile = fq.createWriteStream('../server/data/beats/' + beat + '.csv');

	// read each line of the main csv file
	readCrimes(function(crime){
		var crimestring = _.values(crime).join(', ');
		beatFile.write(crimestring);

	}, function(){
		console.log('Finished writing to ' + beat + ' file')
	});
});


// kinda works...
// var beatFile = fq.createWriteStream('../server/data/beats/12X.csv');

// // read each line of the main csv file
// readCrimes(function(crime){
//   var crimestring = _.values(crime).join(', ');
//   beatFile.write(crimestring);

// }, function(){
//   console.log('Finished writing to 12X file')
// });

