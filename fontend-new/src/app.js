var forexApp = angular.module('forexApp',['ui.router']);

forexApp.config(function($stateProvider) {

	var dashboard = {
		name:'dashboard',
		url:'',
		templateUrl:'modules/dashboard/dashboard.html'
	};

	var planState = {
		name: 'plan',
		url: 'plan',
		templateUrl:'modules/plan/plan.html'

	};
	var strategyState = {
		name: 'strategy',
		url: 'strategy',
		templateUrl:'modules/strategy/strategy.html'

	};

	$stateProvider.state(dashboard);
	$stateProvider.state(planState);
	$stateProvider.state(strategyState);
});