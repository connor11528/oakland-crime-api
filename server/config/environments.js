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
		database: 'mongodb://heroku_9jck8lzt:hoh7r0mg897hno5rlce70s5co8@ds115738.mlab.com:15738/heroku_9jck8lzt',
		port: process.env.PORT || 80
	}
};

// 'mongodb://jasonshark:multivision@ds037478.mongolab.com:37478/multivision'
// mongodb://dbuser:dbpass@host:port/dbname