var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var envConfig = require('./server/config/environments')[env];

// EXPRESS CONFIG
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// DATABASE
require('./server/config/database')(envConfig);

// ROUTES
require('./server/config/routes')(app, envConfig);

// start server
app.listen(envConfig.port, function(){
	console.log('server started on port ' + envConfig.port);
});
exports = module.exports = app;