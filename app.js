var express = require('express');
var app = express();

var conf = {
	basePath: __dirname,
	app: app,
	express: express
};

require(conf.basePath + '/config/express')(conf);
require(conf.basePath + '/config/routes')(conf);