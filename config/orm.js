var connection = require('../config/connection.js');

// Question marks for sql values
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	};

	return arr.toString();
};

// Get column names in SQL table
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		if (Object.hasOwnProperty.call(ob, key)) {
			arr.push(key + "=" + ob[key]);
		};
	};

	return arr.toString();
};

// ORM
var orm = {
	// Function to find all data in burgers table
	all: function(tableName, cb) {
		var queryStr = 'SELECT * FROM ' + tableName + ';';
		connection.query(queryStr, function(err, res) {
			if (err) {
				console.log(err);
			};
			cb(res);
		});
	},
	// Function to create new burger
	create: function(tableName, cols, vals, cb) {
		console.log(cols);
		// Setting up query string for mysql to use
		var queryStr = 'INSERT INTO ' + tableName;
		queryStr += ' (';
		queryStr += cols.toString();
		queryStr += ') ';
		queryStr += 'VALUES (';
		queryStr += printQuestionMarks(vals.length);
		queryStr += ')';

		connection.query(queryStr, vals, function(err, res) {
			if (err) {
				console.log(err);
			};
			cb(res);
		});
	},
	// Function to update burger devoured status
	update: function(tableName, objColVals, burgerID, cb) {
		var queryStr = "UPDATE " + tableName;
		queryStr += " SET ";
		queryStr += objToSql(objColVals);
		queryStr += " WHERE ";
		queryStr += burgerID;

		connection.query(queryStr, function(err, res) {
			if (err) {
				console.log(err);
			};
			cb(res);
		});
	}
};

module.exports = orm;