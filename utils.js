var fs = require('fs');
var bootstrap;
var utils = {
	static: function() {
		var path = (this.req.url.split('/'));
		path.shift()
		path.shift();
		console.log('STATIC '+path.join('/'));
		staticServer.serve(this.req, this.res);
	},
	bootstrap: function() {
		if(!bootstrap){
			console.log('Prepped bootstrapper');
			bootstrap = fs.readFileSync('bootstrap.html', 'UTF-8');
		}
		this.end(bootstrap)
	},
	logout: function() {

	},
	login: function() {

	},
	refresh: function() {
		for (var module in require.cache) {
			console.log('Reloaded '+module);
			delete require.cache[module];
		}
		global.x = require('./x.js');
		this.end('Modules reloaded');
	},
	'favicon.ico':function(){
		this.res.end('');
	}
};
module.exports = utils;
