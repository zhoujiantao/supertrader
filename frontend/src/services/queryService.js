forexApp.service('queryService',['$q','$http','apiUrl','dataUrl',function($q,$http,apiUrl,dataUrl){

	for(var i in apiUrl)
	{
		if( typeof  apiUrl[i]=='string')
		{
			apiUrl[i]=dataUrl+  apiUrl[i];
		}
		else{
			for(var j in apiUrl[i])
			{
				apiUrl[i][j]=dataUrl+  apiUrl[i][j];
			}
		}
	}
	this.queryStrategy = function(){
		return $http({
			url: apiUrl.strategy.getAll,
			method: 'Get'
		});

	}
	this.getStrategy = function(id)
	{
		return $http({
			url: apiUrl.strategy.getById,
			method: 'Get' ,
			params:{id:id}
		});
	}
	this.getStrategyItems = function(id)
	{
		return $http({
			url: apiUrl.strategy.getItems,
			method: 'Get'

		});
	}
	this.addStrategy = function(params){

		return $http({
			url:apiUrl.strategy.add,
			method:'POST',
			data: params
		});
	}
	this.addStrategyItems = function(params){
		return $http({
			url:apiUrl.strategy.add,
			type:'POST',
			data: params
		});
	}

}]);