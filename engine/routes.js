define(function(require){
	
	//Getting the app handler
	var app = require("app");
	var config = require("appConfig");
	app.config(function($controllerProvider, $stateProvider, $urlRouterProvider, $routeInjectorProvider) {
		
		var route = $routeInjectorProvider.config.directories({view:config.view.templates, controller:config.controllers.path}).setHandler($controllerProvider).route;
		//var route = $routeInjectorProvider.config.directories({view:config.view.templates, controller:config.controllers.path}).setHandler($controllerProvider).route;

		$stateProvider
			.state('login', route.resolve("login",{
			    resolve:{
			      setVar:function(){return "'This is a resolved string injected into controller'"}
			}		
			}));				
			
			$urlRouterProvider.otherwise('/');
		});
		
		return app;
});