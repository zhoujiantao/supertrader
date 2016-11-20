/**
 * Created by zjt on 2016/10/2.
 */

forexApp.controller('strategyEditCtrl',['queryService','$scope','$routeParams',function(queryService,$scope,$routeParams){




	$scope.strategyModel={
		id:'',
		name:'',
		desc:'',
		userId:1
	};
	$scope.items=[];
	$scope.strategyItemModel={
		name:'',
		desc:'',
		strategyId:''
	};
	$scope.showItemForm = false;
	$scope.addItem = function(){
		$scope.showItemForm=true;
	}
	$scope.save = function(){
		queryService.addStrategy( $scope.strategyModel).then(function(response){

			$scope.strategyModel=response.data;
		});
	}
	$scope.saveItem = function(){
		queryService.addStrategyItems( $scope.strategyItemModel).then(function(response){

			$scope.items=response.data;
		});
	}


	var id = $routeParams.id;
	if(id)
	{
		queryService.getStrategy(id).then(function(response){
			$scope.strategyModel = response.data;
		});
		queryService.getStrategyItems(id).then(function(response){
			$scope.items = response.data;
		});
	}


}]);



