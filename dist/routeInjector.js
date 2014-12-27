(function(definition){           
    //Checkpoints for angular and require
    (window.angular == undefined) ? (function(){
                throw new Error("Angular should be loaded before loading the plugin");                
            })() : false;
    (window.requirejs == undefined) ? (function(){
                definition();
                //Got some work to Emulate require          
                window.require = function(deps,callback){
                    'use strict;'
                    var scriptTag = document.createElement("script");
                    scriptTag.src = deps[0];
                    /*scritTag.async = 'async';*/
                    document.head.appendChild(scriptTag);
                    callback(); //Execute after all the scripts are attached
                };            
        })() : (function(){
                window.define(definition);
            })();  
})(function () {
'use strict';

    var angular = window.angular;
    var servicesApp = angular.module('ui.route.Injector', []);
    var $routeInjector = function () {
        var _self = this; //Base handler
        
        _self.$get = function () {
            return _self;
        };

        _self.config = function () {
            /*var viewsDirectory = '/app/views/',
                controllersDirectory = '/app/controllers/',*/

            var viewsDirectory = '',
                controllersDirectory = '',

            directories = function (directories) {
                viewsDirectory = directories.view;
                controllersDirectory = directories.controller;
                return _self;
            },

            getViewsDirectory = function () {
                return viewsDirectory;
            },

            getControllersDirectory = function () {
                return controllersDirectory;
            };

            return {
                directories: directories,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory
            };
        }();
                
        _self.setHandler=function($controller){
            if(window.requirejs != undefined){
                window.requirejs.s.contexts._.defined["$ControlInjector"] = $controller.register;    
            }else{
                window.angular["$ControlInjector"] = $controller.register;
            }
            
            return _self.$get();
        };


        this.route = function (config) {

            var resolve = function (baseName, obj) {
                    if(window.requirejs != undefined){
                       if((window.requirejs.s.contexts._.defined["$ControlInjector"] == undefined) || (window.requirejs.s.contexts._.defined["$ControlInjector"] == null)){
                            throw new Error("$routeInjectorProvider - setHandler : Set the control handler API: $routeInjectorProvider.setHandler('undefined')");
                            return null;
                        }                    
                    }else if((window.requirejs == undefined) && (window.angular.$ControlInjector == undefined)){
                       throw new Error(" $routeInjectorProvider - setHandler : Set the control handler API: $routeInjectorProvider.setHandler('undefined')");                                                            
                       return null;
                    }                    
                    obj = !obj ? new Object(): obj;
                    var routeDef = {};
                    routeDef.url = (((obj.url != undefined) && (obj.url != null)) ? obj.url : '/'+baseName).replace('//','/');
                    routeDef.templateUrl = (config.getViewsDirectory() + '/' + ((obj.templateUrl != undefined) && (obj.templateUrl != null) ? obj.templateUrl : '') + baseName + '.html').replace("//","/");
                    routeDef.controller = baseName + 'Controller';
                    /*routeDef.secure = (secure) ? secure : false;*/
                    routeDef.resolve = {
                        $moduleInject:function ($q, $rootScope) {                            
                            var dependencies = [(config.getControllersDirectory() + '/'  + ((obj.controllerPath != undefined) && (obj.controllerPath != null) ? obj.controllerPath : '') +"/" + baseName + '.js').replace("//","/")];
                            return resolveDependencies($q, $rootScope, dependencies);
                        }
                    };                                          
                   if((((Object.getOwnPropertyNames != undefined) && (obj.resolve != undefined) && (obj.resolve != null)) ? Object.getOwnPropertyNames(obj.resolve).length != 0 : (function(){for(var key in obj.resolve) break; return (key != null) && (key != undefined);})()) && (obj.resolve != undefined)){
                       for (var key in obj.resolve){                           
                            routeDef.resolve[key] = obj.resolve[key];      
                       }
                   }
                   
                    return routeDef;
                },

            resolveDependencies = function ($q, $rootScope, dependencies) {
                var defer = $q.defer();
                require(dependencies, function () {                    
                    defer.resolve();
                    if(!$rootScope.$$phase) {
                        $rootScope.$apply();                        
                    }
                    
                });

                return defer.promise;
            };

            return {
                resolve: resolve
            };
        }(this.config);

    };

    //Must be a provider since it will be injected into module.config()    
    servicesApp.provider('$routeInjector', $routeInjector);
});
