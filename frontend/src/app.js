var forexApp = angular.module('forexApp',['ui.router']);




forexApp.run(function($rootScope,$location){
    $rootScope.isLogin = true;


});