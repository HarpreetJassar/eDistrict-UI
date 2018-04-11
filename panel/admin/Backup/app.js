define(['angularAMD', 'angular-route'], function (angularAMD) {
  var app = angular.module("webapp", ['ngRoute']);
  
  app.config(function ($routeProvider, $locationProvider, $httpProvider, $window) {
    var authInterceptorsFactory = {};

    authInterceptorsFactory.request = function (config) {
        var token = $window.localStorage.getItem('token');

        if (token) config.headers['x-access-token'] = token;

        return config;
    };

    $httpProvider.interceptors.push(authInterceptorsFactory);
    
    $routeProvider
    .when("/admin/home", angularAMD.route({
        templateUrl: 'views/home.html', controller: 'HomeCtrl', controllerUrl: 'controllers/homeCtrl'
    }))
    .otherwise({redirectTo: "/home"});
  })

  .run(function($rootScope, $window) {
    if (AuthToken.isLoggedIn()) {
        try{
          var data = JSON.parse(AuthToken.getUser());
        } catch {
          $window.location.href = '../index.html';
        }
        $rootScope.user_type = data.user_type;
        $rootScope.f_name = data.f_name;
        $rootScope.m_name = data.m_name;
        $rootScope.l_name = data.l_name;
        $rootScope.dept_name = data.dept_name;
    } else {
        $window.location.href = '/Admin/Login';
    }
  });
  
  return angularAMD.bootstrap(app);
});