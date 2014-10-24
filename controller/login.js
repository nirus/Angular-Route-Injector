define(["require","$ControlInjector"],function(require, $ControlInjector){
	//window.angular.$ControlInjector("loginController",function($scope){         
    $ControlInjector("loginController",function($scope,setVar){
    	$scope.resolve = setVar;
        console.log("Login Controller Loaded");          
    });
});
 	