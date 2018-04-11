angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/actor/home', {
            templateUrl: 'modules/home/dashboard.html',
            controller: 'homeCtrl'
        })
        .when('/actor/history', {
            templateUrl: 'modules/history/history.html',
            controller: 'historyCtrl'
        })
        .when('/agriculture/issueseedlicense', {
            templateUrl: 'modules/DepartOfAgriculture/issueseedlicense.html',
            controller: 'issueseedCtrl'
        })
        .otherwise({
            redirectTo: '/actor/home'
        }); 
});