var express = require('express'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var app = express();

// Static content for the app from current working directory
app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Override POST with ?_method=...
app.use(methodOverride("_method"));

// Require express-handelbars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set route to controller file
var burgers = require('./controllers/burgers_controller.js');

app.use("/", burgers);

app.listen(port);