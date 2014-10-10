// Scrape all current year murder victims from a news site
// Special note: scraperjs > phantomjs for this simple task

var scraperjs = require('scraperjs');
var fs = require('fs');

scraperjs.StaticScraper.create('http://www.insidebayarea.com/homicides')
    .scrape(function($) {
    	// this selects more than only Oakland victims. My bad.
        return $("#region8 .listNoImage a").map(function() {
            return $(this).text();
        }).get();
    }, function(victims) {
        // write to file
        var file = fs.createWriteStream('data/homicideVictims-2014.txt');
		file.on('error', function(err) { /* error handling */ });
		victims.forEach(function(v) { 
			console.log(v)
			file.write(v + '\n'); 
		});
		file.end();
    });