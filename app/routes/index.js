'use strict';
var marked = require('marked');
var fs = require('fs');

module.exports = function (app, passport) {
	

	app.route('/')
		.get(function (req, res) {
			/*Homepage displays readme file.  I didn't want to load template engine for rendering only one page,
			so I wrote similar functionality by myself. */
			
			fs.readFile(process.cwd() + '/README.md', 'utf-8', function(err, readme){
				if (!err) {
					//parsing markdown.
					var parsedReadme = marked(readme);
					
					fs.readFile(process.cwd() + '/views/layout.html', 'utf-8', function(err, layout){
						if (!err) {
							var output = layout.replace(/<placeholder\/>/, parsedReadme);
							res.send(output);
						}	
					});
				//	res.send(parsedReadme);
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
