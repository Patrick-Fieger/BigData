var index = ['$scope','$http',function($scope,$http){
	$http.get('/airlines').success(function(){
		// alert('hahahah')
	})
}];