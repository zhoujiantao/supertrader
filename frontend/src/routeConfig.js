forexApp.config(function($stateProvider){

    var loginRoue = {
        name:'login',
        url:'/login',
        controller:'loginCtrl',
        templateUrl:'/modules/login/login.html'
    };
    var dashboardRoute = {
        name:'dashboard',
        url:'/dashboard',
        controller:'dashboardCtrl',
        templateUrl:'/modules/dashboard/dashboard.html'
    };

    var  symbolRoute = {
        name:'symbol',
        url:'/symbol',
        controller:'symbolCtrl',
        templateUrl:'/modules/symbol/symbol.html'
    };
    var  strategyRoute = {
        name:'strategy',
        url:'/strategy',
        controller:'strategyCtrl',
        templateUrl:'/modules/strategy/strategy.html'
    };
	var  strategyEditRoute = {
		name:'strategyEdit',
		url:'/strategyEdit',
		controller:'strategyEditCtrl',
		templateUrl:'/modules/strategy/strategyEdit.html'
	};
    var  accountManageRoute = {
        name:'accountManage',
        url:'/accountManage',
        controller:'accountManageCtrl',
        templateUrl:'/modules/account/accountManage.html'
    };
	var  planRoute = {
		name:'planRoute',
		url:'/plan',
		controller:'planCtrl',
		templateUrl:'/modules/plan/plan.html'
	};
	var  planEditRoute = {
		name:'planEditRoute',
		url:'/planEdit',
		controller:'planEditCtrl',
		templateUrl:'/modules/plan/planEdit.html'
	};

    $stateProvider.state(loginRoue);
    $stateProvider.state(dashboardRoute);
    $stateProvider.state(symbolRoute);
    $stateProvider.state(strategyRoute);
	$stateProvider.state(strategyEditRoute);
    $stateProvider.state(accountManageRoute);
	$stateProvider.state(planRoute);
	$stateProvider.state(planEditRoute);
});