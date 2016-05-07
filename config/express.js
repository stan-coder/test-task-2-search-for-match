module.exports = (conf) => {

	var bodyParser = require('body-parser');

	conf.app.set('view engine', 'ejs');
	conf.app.use(bodyParser.urlencoded({ extended: false }))
	conf.app.use(bodyParser.json());
	conf.app.use(conf.express.static(conf.basePath + '/public'));

	conf.app.use((err, req, res, next) => {
	  console.error(err.stack);
	  res
	  	.status(500)
	  	.send('Something broken!');
	});

	conf.app.listen(7000, () => {
	  console.log('Server is listening on port 7000');
	});
};