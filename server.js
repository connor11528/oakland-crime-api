var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port = process.env.PORT || 8080;

// CONFIG
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// load models, connect to database
require('./server/database')();

// ROUTES
require('./server/routes')(app);

// start server
app.listen(port, function(){
	console.log('server started on port ' + port);
});
exports = module.exports = app;