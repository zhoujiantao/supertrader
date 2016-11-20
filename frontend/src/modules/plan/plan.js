forexApp.controller('planCtrl',['$location','$scope',function($location,$scope){

	$scope.listData=[];


	$scope.loadListData = function(){

	}
	$scope.addPlan = function(){
		$location.url('/planEdit');
	}
}]);