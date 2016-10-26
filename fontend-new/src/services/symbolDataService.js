forexApp.factory('symbolDataService',function($http){
  return {
    getAll:function(){
        return $http.get('http://localhost:5000/symbol');
    }
  };
});
