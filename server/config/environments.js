// configure environments
//========================
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

// configuration object
module.exports = {
	development: {
		rootPath: rootPath,
		database: 'mongodb://localhost/oakCrime',
		port: process.env.PORT || 3000
	},
	production: {
		rootPath: rootPath,
		database: 'mongodb://openoakland:openoakland@ds051170.mongolab.com:51170/heroku_app30730676',
		port: process.env.PORT || 80
	}
};

// 'mongodb://jasonshark:multivision@ds037478.mongolab.com:37478/multivision'
// mongodb://dbuser:dbpass@host:port/dbname