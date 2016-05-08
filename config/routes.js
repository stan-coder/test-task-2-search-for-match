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
				return errorCb();
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
	conf.app.post('/getMatch', (req, res) => {

		getPrepareData(
			() => {
				res.json({
					success: false
				});
			},
			(data) => {
				var mode = req.body.mode;

				if (!Number.isInteger(mode)) {
					return res.json({
						success: false
					});
				}
				var path = `${conf.basePath}/inc/` + (mode === 3 ? 'similarity' : 'entry');

				var result = (new (require(path))(...data.map(str => str.split('\n')))).init(mode);
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