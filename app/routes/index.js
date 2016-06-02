'use strict';
var marked = require('marked');
var fs = require('fs');

module.exports = function (app, passport) {

	app.route('/')
		.get(function (req, res) {
			var readme = fs.readFile(process.cwd() + '/README.md', 'utf-8', function(err, data){
				if (!err) {
					var parsed = marked(data);
					res.send(parsed);
				}
				else {
					console.log(process.cwd());
					res.send('error');
				}
			})
		});

	app.route('/:param')
		.get(function (req, res) {
			res.send('invoking API for '+ req.params.param);
		});

	
};
