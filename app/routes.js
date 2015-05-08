var flight = require('./controller/flight')

module.exports = function(app){
	app.get('/test', flight.testfunction);
}