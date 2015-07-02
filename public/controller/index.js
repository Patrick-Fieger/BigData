var index = ['$scope','$rootScope','$http','planeGraph',function($scope,$rootScope,$http,planeGraph){

	$scope.emissions = {};
	$scope.airlines = [];
	$scope.aircrafts = [];
	$scope.planes = [];
	var planesArray = [];
	$scope.planeTypes = {};

	var longs = {};


	$scope.output = {};


Array.max = function( array ){
return Math.max.apply( Math, array );
};
Array.min = function( array ){
return Math.min.apply( Math, array );
};

	$scope.keys = function(obj){
		return obj? Object.keys(obj) : [];
	}

	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	function map_range(value, low1, high1, low2, high2) {
		return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
	}


	$http.get('/airlines').success(function(result,status){
		var yValues=[];

		var prevent = {}
		for(var a in result) {
			var airlineColor = getRandomColor();

			for(var i = 0; i < result[a].planes.air.length; i++){
				var planeground = result[a].planes.air[i][13];

				var obj = {
					id: planeground,
					label: planeground,
					x: result[a].planes.air[i][2],
					y: (result[a].planes.air[i][1]-47) * 15,
					size: 1,
					color: airlineColor,
				}

				var key = parseInt(result[a].planes.air[i][2]);
					/*key = map_range(key, -180,180,0,360);
					key += 90;*/

				if(typeof longs[key] === 'undefined') longs[key] = new Array(); 

				longs[key].push(obj);

			}
		}


		for(var key in longs){
			// reset
			var yMin = { y: 0 },
				yMax = { y: 0 };

			

			for(var j = 0; j < longs[key].length; j++){
				
				if(longs[key][j].y < yMin.y || yMin.y == 0) yMin = longs[key][j];
				if(longs[key][j].y > yMax.y || yMax.y == 0) yMax = longs[key][j];

			}

			$scope.output[key] = {
				amount: longs[key].length,
				min: yMin,
				max: yMax
			};
		}


		console.log(longs);
		console.log($scope.output);

		$scope.test = longs;

		$rootScope.showLoader = 0;

	});


	/*$http.get('/overview').success(function(result,status){
		$scope.aircrafts = result;
	});*/

	$http.get('/emissions').success(function(result,status){
		$scope.emissions = result;
	});




}];