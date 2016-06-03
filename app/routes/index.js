'use strict';
//module for parsing markdown
var marked = require('marked');
var fs = require('fs');

module.exports = function (app, passport) {
	

	app.route('/')
		.get(function (req, res) {
			/*Homepage displays readme file.  I didn't want to load template engine for rendering only one page,
			so I wrote similar functionality by myself. */
			
			fs.readFile(process.cwd() + '/README.md', 'utf-8', function(err, readme){
				if (!err) {
					var parsedReadme = marked(readme);
					
					fs.readFile(process.cwd() + '/views/layout.html', 'utf-8', function(err, layout){
						if (!err) {
							var output = layout.replace(/<placeholder\/>/, parsedReadme);
							res.send(output);
						}	
						else {
							res.status(500).send('Error loading layout file.')
						}
					});
				}
				else {
					res.status(500).send('Error loading readme file.');
				}
			})
		});

	app.route('/:requestString')
		.get(function (req, res) {
			
			var requestString = req.params.requestString;
			var result = {};
			var monthNames = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
				];
			
			/* if timestamp is given */
			if (/^-?\d+$/.test(requestString)) {
				var date = new Date(parseInt(requestString)*1000);
				var day = date.getDate();
				var month = monthNames[date.getMonth()];
				var year = date.getFullYear();
				result.unix = parseInt(requestString);
				result.natural = month + ' ' + day + ', ' + year;
				res.json(result);
			}
			else {
				var dateRegexp = /^([A-za-z]{3,})\s+(\d{1,2}),\s+(\d{4})\s*$/;
				var match = requestString.match(dateRegexp);
				
				/* if natural language date is given and conforms to the rules */
				if (match && match.length === 4 && //if we successfully get all 3 parameters and
					monthNames.indexOf(match[1]) !== -1 && //if we have proper month name
					+match[2] > 0 && //and if day of the month is within reasonable range
					+match[2] <= 31
					) {
						var date = new Date(match[1]+' '+match[2]+', '+match[3]);
						result.unix = date.getTime();
						//I create date obj from given params to be able to convert February 31 to March 2
						result.natural = monthNames[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear();
						res.json(result);
					}
				/* if request is wrong */
				else {
					result.unix = null;
					result.natural = null;
					res.json(result);
				}
			}
			
		});

	
};
