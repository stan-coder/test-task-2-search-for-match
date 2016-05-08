module.exports = (conf) => {

	/**
	 * Prepare data midleware
	 */
	function getPrepareData(errorCb, successCb) {
		require(conf.basePath + '/inc/prepareData')((result) => {

			if (Object.getPrototypeOf(result) !== Object.prototype || result.success !== true || !result.hasOwnProperty('data')) {
				if (result.error) {
					console.error(result.error);
				}
				errorCb();
				return;
			}
			successCb(result.data);
		});
	}


	/**
	 * Main page
	 */
	conf.app.get('/', (req, res) => {

		getPrepareData(
			() => {
				res.render(conf.basePath + '/public/cantOpenFiles');
			},
			(data) => {
				res.render(conf.basePath + '/public/index', {
					input: data[0], 
					patterns: data[1]
				});
			}
		);
	});


	/**
	 * Getting match
	 */
	conf.app.post('/getMath', (req, res) => {

		getPrepareData(
			() => {
				res.json({
					success: false
				});
			},
			(data) => {
				var Similarity = require(conf.basePath + '/inc/similarity');
				var result = (new Similarity(...data.map(str => str.split('\n')))).init();

				res.json({
					success: true, 
					data: result
				});
			}
		);
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