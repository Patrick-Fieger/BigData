var index = ['$scope','$http',function($scope,$http){
	$http.get('/test').success(function(){
		alert('hahahah')
	})
}];