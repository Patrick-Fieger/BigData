var index = ['$scope','$rootScope','$http','planeGraph',function($scope,$rootScope,$http,planeGraph){

	$scope.emissions = {};
	$scope.airlines = [];
	$scope.aircrafts = [];
	$scope.planes = [];
	var planesArray = [];
	$scope.planeTypes = {};
	var s = new sigma('visualisation');
		s.settings({
			defaultNodeColor: '#fff',
			edgeColor: '#ccc',
			defaultEdgeColor: '#ccc'
		})


	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}


	$http.get('/airlines').success(function(result,status){

		var prevent = {}
		for(var a in result) {
			var airlineColor = getRandomColor();
			var prevent = {};
			
			for(var i = 0; i < result[a].planes.air.length; i++){
				var planeground = result[a].planes.air[i][13];
				if(planeground != ''){
					if(!prevent[planeground] || planeground != '' || prevent[planeground] != true){
						prevent[''+planeground] = true;

						var obj = {
							id: planeground,
							x: Math.floor((Math.random() * window.outerWidth) + 1),
							y: Math.floor((Math.random() * window.outerHeight) + 1),
							z: -100,
							size: 0,
							color: airlineColor,
						}

						planesArray.push(obj);
						s.graph.addNode(obj);
					}
				}
			}
			
			/*var prevent = {}
			for(var i = 0; i < result[a].planes.ground.length; i++){
				var planeground = result[a].planes.ground[i][13];

				if(planeground != ''){
					if(!prevent[planeground] || planeground != '' || prevent[planeground] != true){
						prevent[''+planeground] = true;
						
						var c = i + 1;
							if(c > result[a].planes.ground.length-1) c = 0;


						s.graph.addEdge({
							id: result[a].planes.ground[i][13] + '-' + result[a].planes.ground[c][13],
							source: result[a].planes.ground[i][13],
							target: result[a].planes.ground[c][13]
						});

					}
				}
			}*/
		}

		$rootScope.showLoader = 0;
		//$scope.planes = planesArray;
		// console.log($scope.planes);
		//console.log($scope.airlines);
		// console.log($scope.planeTypes);

		/*s.graph.addEdge({
		id: 'e0',
		source: 'n0',
		target: 'n1'
		});*/


		s.refresh();

	});


	/*$http.get('/overview').success(function(result,status){
		$scope.aircrafts = result;
	});*/

	$http.get('/emissions').success(function(result,status){
		$scope.emissions = result;
	});




}];