var index = ['$scope','$http','planeGraph',function($scope,$http,planeGraph){

	$scope.emissions = {};
	$scope.airlines = [];
	$scope.aircrafts = [];
	$scope.planes = [];
	$scope.planeTypes = {};

	$http.get('/airlines').success(function(result,status){

		$scope.airlines = result;

		for(var a in $scope.airlines) {
			for(var i = 0; i < $scope.airlines[a].planes.ground.length; i++){
				$scope.planes.push({
					id: a,
					name: $scope.airlines[a].planes.ground[i][13],
				})
				if(typeof $scope.planeTypes[$scope.airlines[a].planes.ground[i][8]] === 'undefined') $scope.planeTypes[$scope.airlines[a].planes.ground[i][8]] = 0;
				$scope.planeTypes[$scope.airlines[a].planes.ground[i][8]] += 1;
			}
		}

	});


	$http.get('/overview').success(function(result,status){
		$scope.aircrafts = result;
	});

	$http.get('/emissions').success(function(result,status){
		$scope.emissions = result;
	});


}];