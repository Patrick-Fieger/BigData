var index = ['$scope','$http',function($scope,$http){

	$scope.emissions = {};
	$scope.airlines = [];
	$scope.aircrafts = [];

	$http.get('/airlines').success(function(result,status){
		console.log(result);
		console.log(status);

		$scope.airlines = result;
		console.log($scope.airlines.length);
		var test = 0;
		for(var i in $scope.airlines){
			test += 1;
		}
		console.log(test);
		// alert('hahahah')
	});
	$http.get('/overview').success(function(result,status){
		console.log(result);
		console.log(status);

		$scope.aircrafts = result;
		console.log($scope.aircrafts.length);
		var test = 0;
		for(var i in $scope.aircrafts){
			test += 1;
		}
		console.log(test);
		// alert('hahahah')
	});
	$http.get('/emissions').success(function(result,status){
		$scope.emissions = result;
		//$scope.initClock();
		// alert('hahahah')
	});

	$scope.initCarousel = function(){
		console.log('test');
	}

	$scope.hallowelt = function(){

		console.log('hallo');

		var counter = 0;
		setTimeout(function(){
			 var interval = setInterval(function() {
				clock.increment();
				counter += 1;
			}, 500);
		}, 1000);
	};


}];