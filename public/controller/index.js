var index = ['$scope','$rootScope','$http','planeGraph',function($scope,$rootScope,$http,planeGraph){

	$scope.emissions = {};
	$scope.airlines = [];
	$scope.aircrafts = [];
	$scope.planes = [];
	var planesArray = [];
	$scope.planeTypes = {};
	var s = new sigma('visualisation');


	$http.get('/airlines').success(function(result,status){

		var prevent = {}
		for(var a in result) {
			
			for(var i = 0; i < result[a].planes.ground.length; i++){
				var planeground = result[a].planes.ground[i][13];

				if(!prevent[planeground] || prevent[planeground] != true){
					prevent[planeground] = true;
					var obj = {
						id: planeground,
						label: planeground,
						x: Math.floor((Math.random() * 30) + 1),
						y: Math.floor((Math.random() * 30) + 1),
						size: Math.floor((Math.random() * 5) + 1)
					}

					planesArray.push(obj);
					s.graph.addNode(obj);
				}
			}
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