var index = ['$scope','$http','planeGraph',function($scope,$http,planeGraph){

	$scope.emissions = {};
	$scope.airlines = [];
	$scope.aircrafts = [];
	$scope.planes = [];
	var planesArray = [];
	$scope.planeTypes = {};
	var s = new sigma('visualisation');


	$http.get('/airlines').success(function(result,status){

		$scope.airlines = result;

		var prevent = {}

		for(var a in $scope.airlines) {
			for(var i = 0; i < $scope.airlines[a].planes.ground.length; i++){
				console.log($scope.airlines[a].planes.ground[i][13] + ': ' + prevent[$scope.airlines[a].planes.ground[i][13]]);
				if(!prevent[$scope.airlines[a].planes.ground[i][13]]){
					prevent[$scope.airlines[a].planes.ground[i][13]] = 1;
					
					planesArray.push({
						id: $scope.airlines[a].planes.ground[i][13],
						label: $scope.airlines[a].planes.ground[i][13],
						x: Math.floor((Math.random() * 30) + 1),
						y: Math.floor((Math.random() * 30) + 1),
						size: Math.floor((Math.random() * 5) + 1)
					})

					//s.graph.addNode(planesArray[i]);

				} else {
					console.log(prevent[$scope.airlines[a].planes.ground[i][13]]);
				}


				if(typeof $scope.planeTypes[$scope.airlines[a].planes.ground[i][8]] === 'undefined') $scope.planeTypes[$scope.airlines[a].planes.ground[i][8]] = 0;
				$scope.planeTypes[$scope.airlines[a].planes.ground[i][8]] += 1;
			}
		}


		//$scope.planes = planesArray;
		console.log($scope.planes);
		console.log($scope.airlines);
		console.log($scope.planeTypes);

		/*s.graph.addEdge({
		id: 'e0',
		source: 'n0',
		target: 'n1'
		});*/

		s.refresh();

	});


	$http.get('/overview').success(function(result,status){
		$scope.aircrafts = result;
	});

	$http.get('/emissions').success(function(result,status){
		$scope.emissions = result;
	});




}];