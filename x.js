//Core X module logic.
var url = require('url');

global.atom = require('./atom.js');

var x = function(req, res) {
		try {
			this.req = req;
			this.res = res;

			this.method = req.method.toUpperCase(),
				u = url.parse(req.url, true);
			var path = u.pathname.split('/');
			this.command = path[1];

			var command = this.command,
				commands = this.commands;

			if (commands.core[command]) {
				this.ids = (path[2]||'').split(',');
				var idlen = this.ids.length;
				while (idlen--) {
					this.ids[idlen] = this.ids[idlen].split('-')
				}

				this.what = path[3];
				//Handle core commands (get, create, delete)
				commands.core[command].call(this);
			} else if (commands.utils[command]) {
				//handle utils commands login, logout, static
				commands.utils[command].call(this);

			} else {
				//otherwise we're boostrapping.
				commands.utils.bootstrap.call(this);
			}
		} catch (e) {
			console.log("Server Crash");
			console.log(e);
			this.res.end('Error: ' + e.message);
		}
	};

x.prototype = {
	write: function(data) {
		if (data === undefined) {
			return;
		}
		typeof data === "object" && data !== null && (data = JSON.stringify(data));
		this.res.write(data);
	},
	end: function(data) {
		typeof data === "object" && data !== null && (data = JSON.stringify(data));
		console.log(this.command, this.ids || '', this.where || '');
		this.res.end(data);
	},
	commands: {
		utils: require('./utils.js'),
		core: require('./core.js')
	}
};
module.exports = x;