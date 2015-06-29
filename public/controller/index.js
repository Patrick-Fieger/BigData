var index = ['$scope','$http','planeGraph',function($scope,$http,planeGraph){

	$scope.emissions = {};
	$scope.airlines = [];
	$scope.aircrafts = [];
	$scope.planes = [];
	$scope.planeTypes = {};

	var cy;

	$http.get('/airlines').success(function(result,status){

		$scope.airlines = result;
		console.log($scope.airlines);

		for(var a in $scope.airlines) {
			/*for(var i = 0; i <= $scope.airlines[a].planes.air.length; i++){
				console.log($scope.airlines[a]);
			}*/
			for(var i = 0; i < $scope.airlines[a].planes.ground.length; i++){
				$scope.planes.push({
					id: a,
					name: $scope.airlines[a].planes.ground[i][13],
				})
				if(typeof $scope.planeTypes[$scope.airlines[a].planes.ground[i][8]] === 'undefined') $scope.planeTypes[$scope.airlines[a].planes.ground[i][8]] = 0;
				$scope.planeTypes[$scope.airlines[a].planes.ground[i][8]] += 1;
			}
		}

		console.log($scope.planeTypes);

		planeGraph( $scope.planes ).then(function( peopleCy ){
			cy = peopleCy;

			// use this variable to hide ui until cy loaded if you want
			$scope.cyLoaded = true;



			cy.on('tap', function(event){
				var evtTarget = event.cyTarget;

				console.log(evtTarget);
				if( evtTarget === cy ){
					console.log('tap on background');
				} else {
					console.log('tap on some element');
				}
			});

			cy.on('mouseover', function(event){
				var evtTarget = event.cyTarget;

				console.log(evtTarget);

				if( evtTarget === cy ){
					console.log('hover on background');
				} else {
					console.log('hover on some element');
				}
			});




		});
	});


	$http.get('/overview').success(function(result,status){
		$scope.aircrafts = result;
	});

	$http.get('/emissions').success(function(result,status){
		$scope.emissions = result;
	});

/*	$scope.people = [
		{ id: 'l', name: 'Laurel', weight: 65 },
		{ id: 'h', name: 'Hardy', weight: 110 }
	];

	var peopleById = {};
	for( var i = 0; i < $scope.people.length; i++ ){
		var p = $scope.people[i];

		peopleById[ p.id ] = p;
	}*/

	// you would probably want some ui to prevent use of PeopleCtrl until cy is loaded
	

	/*$scope.onWeightChange = function(person){
		planeGraph.setPersonWeight( person.id, person.weight );
	};

	planeGraph.onWeightChange(function(id, weight){
		peopleById[id].weight = weight;

		$scope.$apply();
	});*/








}];





