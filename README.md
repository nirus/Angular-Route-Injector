# Angular-Route-Injector
======================

ARI is a light weight Angular add-on plugin that is used in conjuction with Angular ui-router.

Angular ui-router Link : https://github.com/angular-ui/ui-router

It is a helper plugin that is designed to inject the controller scripts on-demand thus reducing the 
memory foot prints caused due the prefetched Angular controller modules.

This is a AMD approach to inject controller on demand on the fly.

## Documentation:

**With RequireJS framework** - Sync the repo

1. Declare a shim configuration with angular as dependency -  *see main.js*
2. Add dependency to your main app module - "ui.route.Injector" - *see app.js*
3. Define your controller with "$ControlInjector" as dependancy and attach your controller code to this handler - *see login.js*
4. Add "$routeInjectorProvider" in your application config - *see route.js*
5. Set your view/template and controller directories using $routeInjectorProvider.config.directories API - *see route.js*
6. Set the $controllerProvider handle to the plugin using setHandler API - *see route.js*

**Without Require JS / Plain Angular project**:

1. Add dependency to your main app module - "ui.route.Injector" - *see app.js*
2. Add "$routeInjectorProvider" in your application config - *see route.js*
3. Set your view/template and controller directories using $routeInjectorProvider.config.directories API - *see route.js*
4. Set the $controllerProvider handle to the plugin using setHandler API - *see route.js*
5. Attach your controller code to *window.angular.$ControlInjector* as shown below


  ```
   window.angular.$ControlInjector("loginController",function($scope){         
        	$scope.resolve = setVar;
          console.log("Login Controller Loaded");          
  });
  ```

## API Reference:

`$routeInjectorProvider.setHandler($controllerProvider)` : pass the angular controller handler to the plugin

`$routeInjectorProvider.config.directories("YOUR_VIEWS_DIR","YOUR_CONTOLLER_DIR")` : sets the path to your HTML templates and controller directory

`route.resolve("YOUR_MODODULE_NAME")` : This will load the module asynchronously on demand

*Note: YOUR_MODODULE_NAME should match HTML file name and your controller javascript file name*

`route.resolve("YOUR_MODODULE_NAME",{resolve:  {key : value}})`: pass the key <=> value that has to be resolved before the controller is loaded. This will be injected into controller on demand *refer login.js*. Value can be function , value or a promise object.

**Note:** 

> Your Controller name will be automatically be genrated by plugin my concatenating YOUR_MOUDULE_NAME + "Controller" string. 

```
Example: 
  
  YOUR_MODULE_NAME : "login" 
  Controller name generated: 'loginController'

```

## Support:

I welcome suggesstion or improvements on this plugin. I encourage developers, code enthusiastist's to add functionalities or make this as a rich plugin with plethora of features by contributing the code.

Raise a question on stackoverflow and mail me the link or raise a issue on github.

Visit: http://www.nirus.org


## Special Thanks
  
> Dan Wahlin

https://github.com/DanWahlin

http://weblogs.asp.net/dwahlin/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs

The above blog inspired me to develop the library as a generic module which can be used with or without Require JS framework.

> Please checkout his Github on custom manager

https://github.com/DanWahlin/CustomerManager



