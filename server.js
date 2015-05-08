var express = require('express')
, app = express()
, expressconfig = require('./config/express')(app)
, mongoose = require('mongoose')
, db = require('./config/database')
, routes = require('./app/routes')(app)
, port = 3000

app.use(express.static(__dirname + '/public')); 
app.listen(port, function() {console.log('Express server listening on port ' + port);});