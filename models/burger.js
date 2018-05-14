var orm = require('../config/orm.js');

var burger = {
	all: function(cb) {
		orm.all('burgers', function(res) {
			cb(res);
		});
	},
	// Create function
	create: function(cols, vals, cb) {
		orm.create('burgers', cols, vals, function(res) {
			cb(res);
		});
	},
	// Update function
	update: function(objColVals, burgerID, cb) {
		orm.update('burgers', objColVals, burgerID, function(res) {
			cb(res);
		});
	}
};

module.exports = burger;