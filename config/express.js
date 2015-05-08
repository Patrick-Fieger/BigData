   express = require('express')
 , morgan = require('morgan')
 , bodyParser = require('body-parser')


module.exports = function(app){
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
}