/*
x.js - August 26 2012
Robin Wallar
*/

//var express = require('express');
//var app = express();
var http = require('http');
var x = require('./x.js');
global.x = x;
var server = http.createServer(function(req, res){
	new global.x(req,res);
});
server.listen(80);

global.staticServer = new(require('node-static').Server);


console.log('x.js started');