/*
	Setting up the environment for the app at the startup and configuring it
*/
require(["require","domready","appConfig"],function(require, domReady, appConfig, log){
		
	//DOMREADY - Wait for the HTML DOM to be ready
	var onReady = function(){
		console.log("Triggered the DOM readyState");
		require(["angular","app","routes"],function(angular){
			angular.bootstrap(document, [appConfig.appName]);	  
		});
	};

	domReady(onReady);
});