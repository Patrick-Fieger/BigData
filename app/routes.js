var flight = require('./controller/flight')

module.exports = function(app){
	app.get('/data', flight.getData);
	app.get('/airlines', flight.getAirlines);
	app.get('/overview', flight.getSimpleData);
	app.get('/emissions', flight.getEmissions);
}