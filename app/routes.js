var flight = require('./controller/flight')

module.exports = function(app){
	app.get('/airlines', flight.getData);
	app.get('/overview', flight.getSimpleData);
}