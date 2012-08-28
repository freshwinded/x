var core = {
	get: function() {
		var x = this;
		a.gebi(function(rows){
			x.end(rows);
		});
	},
	create: function() {
		if(this.method === "POST"){
			this.end('Create Post');
		}else{
			this.end('Create Request.'+this.method);
		}
	},
	del: function() {}
};

module.exports = core;