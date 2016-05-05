var data = require(__dirname + '/inc/prepareData')((res) => {

	if (Object.getPrototypeOf(res) !== Object.prototype || res.success !== true) {
		if (res.error) {
			console.error(res.error);
		}
		return;
	}

	var Similarity = require(__dirname + '/inc/similarity');
	(new Similarity(...res.data)).init();
});
