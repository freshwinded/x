
var mysql = require('mysql');
var config = require('./config.js');

connect = mysql.createClient({
	user: config.db.user,
	password: config.db.password
});
connect.query('USE ' + config.db.db);

var graph = {
	get: function(callback) {
		connect.query('SELECT id, type, cat, cid, name, rid, relationships.from, relationships.to from nodes INNER JOIN relationships on relationships.to = nodes.id OR nodes.id = 1;',
		 function(err, rows, fields) {
				console.log(err);
			callback(rows);
		});
	},
	create:function(cb){
	}
};

module.exports = graph;