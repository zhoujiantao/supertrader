forexApp.controller('symbolCtrl',['$scope','symbolDataService',function($scope,symbolDataService){

  symbolDataService.getAll().then(function(response){
        $scope.symbolList= response.data;
          $scope.selectedSymbol  = $scope.symbolList[0];
    });

}]);
