'use strict';

module.exports = function(cb) {

	var fs = require('fs');
	var promises = [];
	var path = ['input', 'patterns'];
	

	var a = -1;
	while (a++ < 1) {
		{
			promises.push(new Promise((res, rej) => {

				fs.readFile(`data/${path[a]}.txt`, 'utf8', (err, data) => {
					if (err) {
						return rej(err);
					}
					res(data.split('\n'));
				});	
			}));
		}
	}

	Promise.all(promises)
		.then((data) => {
			cb({
				success: true,
				data: data
			});
		})
		.catch((err) => {
			cb({
				success: false,
				error: err
			});
		});	
};