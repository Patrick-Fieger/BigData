var anzahl = 5
, request = require('request')
, async = require('async')
, fs = require('fs-extra')

var api_url = "http://krk.data.fr24.com/zones/fcgi/feed.js?bounds=68.06655870762545,47.468422366083004,-39.29392968750062,-117.7734375&faa=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=900&gliders=1&stats=1&"
var api_detail_url = "http://bma.data.fr24.com/_external/planedata_json.1.4.php?"


Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var getData = function (req,res){
	var json;
	var flightData = [];

	async.series([
    	function(callback){
    		request(api_url, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			  	json = JSON.parse(body)
			  	callback();
			  }
			});
    	},
    	function(callback){
    		var size = Object.size(json);
    		var count = 0;
    		var loaded = 0;
    		for(var key in json){
    			count++;
    			request(api_detail_url + 'f='+ key +'&altitude='+ json[key][4] +'&equip_hint='+ json[key][8] +'&format=2&_='+ json[key][10], function (error, response, body) {
				  if (!error && response.statusCode == 200) {
				  		var data = JSON.parse(body)
				  		loaded++;
						for(var k in data){
							flightData.push(data[k])
						}
						if(count == size && count == loaded){
							callback();
						}
				  }
				});
			}			
    	}
	],function(err, results){
		console.log(flightData)
	});
}

var getSimpleData = function (req,res){
	var json;
	var flightData = [];

	request(api_url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	json = JSON.parse(body)
	  	
		res.send(json).status(200).end();
	  }
	});
}

module.exports = {
	getData : getData,
	getSimpleData : getSimpleData
}