var express = require('express');

var router = express.Router();

// Import burger model
var burger = require('../models/burger.js');

// Routes
// Get all information from database and put on screen
router.get('/', function(req, res) {
	burger.all(function(data) {
		var hbsObject = { 
			burger: data
		};
		console.log(hbsObject);
		// Render index.handlebars and pass its object to use
		res.render("index", hbsObject);
	});
});

// Post new burger to table
router.post('/', function(req, res) {
	burger.create([
		"burger_name"
	], [
		req.body.burger_name
	], function() {
		res.redirect('/');
	});
});

// Update the burger to devoured with PUT
router.put('/:id', function(req, res) {
	var burgerID = 'id = ' + req.params.id;

	burger.update({
		devoured: req.body.devoured
	}, burgerID, function() {
		res.redirect('/');
	});
});

module.exports = router;