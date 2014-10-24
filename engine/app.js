define(['angular','appConfig', 'angular-ui-router','bootstrap','ui-route-injector'], function (angular,appConfig) {
	return angular.module(appConfig.appName, ['ui.router','ui.bootstrap','ui.route.Injector']);	
});