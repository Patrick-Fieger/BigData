var request = require('request')
, mongoose = require('mongoose')
, fs = require('fs-extra')
, db = mongoose.connection
, anzahl = 5


var api_url = "http://krk.data.fr24.com/zones/fcgi/feed.js?bounds=68.06655870762545,47.468422366083004,-39.29392968750062,-117.7734375&faa=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=900&gliders=1&stats=1&"
var api_detail_url = "http://bma.data.fr24.com/_external/planedata_json.1.4.php?"




function getDetails(id, dataSet){
	request(api_detail_url + 'f='+ id +'&altitude='+ dataSet[4] +'&equip_hint='+ dataSet[8] +'&format=2&_='+ dataSet[10], function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  		var data = JSON.parse(body)
			
			for(var k in data){
				console.log(k, ' \t\t\t ' + typeof k)
			}
	console.log('------------------');
			//return data;
	  }
	});
}

function initFlightdata(){
	request(api_url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var json = JSON.parse(body)
		
		var count = 0;
		for(var key in json){
			//console.log(key);
			//console.log(json[key]);
			getDetails(key, json[key]);
			
			if(count >= 10){
				break;
			}
			count++;
		}
	  }
	});
}

initFlightdata();


/*var download = function(uri, filename,id, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', function(){
    	fs.move(filename, __dirname + '/photos/' + id + '/' + filename , function(err) {
    		console.log('done!')
    	});
    });
  });
};

function saveImages(images,id){
	for (var i = 0; i < images.length; i++) {
		var filenameplit = images[i].split('/')
		var filename = filenameplit[filenameplit.length-1];
		download(images[i], filename,id)
	};
}*/

