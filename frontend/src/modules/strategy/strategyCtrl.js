forexApp.controller('strategyCtrl',['queryService','$scope','$location',function(queryService,$scope,$location){


	$scope.listData = [];
	$scope.loadData = function(){
		return queryService.queryStrategy().then(function(response){
			$scope.listData =response.data;
		});
	}
	$scope.add = function(){
		$location.url('/strategyEdit');
	}
	$scope.edit = function(id){
		$location.url('/strategyEdit?id='+id);
	}
	$scope.delete = function(id){

	}
	$scope.loadData();
}]);