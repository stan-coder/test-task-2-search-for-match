module.exports = (conf) => {

	/**
	 * Main page
	 */
	conf.app.get('/', function(req, res) {
		require(conf.basePath + '/inc/prepareData')((result) => {

			if (Object.getPrototypeOf(result) !== Object.prototype || result.success !== true) {
				if (result.error) {
					console.error(result.error);
					res.render(conf.basePath + '/public/cantOpenFiles');
				}
				return;
			}

			//var Similarity = require(conf.basePath + '/inc/similarity');
			//(new Similarity(...result.data.map(str => str.split('\n')))).init();

			res.render(conf.basePath + '/public/index', {
				input: result.data[0], 
				patterns: result.data[1]
			});
		});
	});

	/**
	 * 404 handler
	 */
	conf.app.get('*', (req, res) => {
	  res
	  	.status(404)
	  	.send('Sorry, page not found!');
	});
};