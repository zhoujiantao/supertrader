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
    var  accountManageRoute = {
        name:'accountManage',
        url:'/accountManage',
        controller:'accountManageCtrl',
        templateUrl:'/modules/account/accountManage.html'
    };


    $stateProvider.state(loginRoue);
    $stateProvider.state(dashboardRoute);
    $stateProvider.state(symbolRoute);
    $stateProvider.state(strategyRoute);
    $stateProvider.state(accountManageRoute);

});