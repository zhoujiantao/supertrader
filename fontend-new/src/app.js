var forexApp = angular.module('forexApp',['ui.router']);

forexApp.config(function($stateProvider) {
	var helloState = {
		name: 'hello',
		url: '/hello',
		template: '<h3>hello world!</h3>'
	}

	var planState = {
		name: 'plan',
		url: 'plan',
		templateUrl:'modules/plan/plan.html'

	}

	$stateProvider.state(helloState);
	$stateProvider.state(planState);
});