angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/skm/home', {
            templateUrl: 'modules/home/dashboard.html',
            controller: 'homeCtrl'
        })
        .when('/skm/centers', {
            templateUrl: 'modules/centers/centers.html',
            controller: 'centersCtrl'
        })
        .when('/skm/usermanagement', {
            templateUrl: 'modules/usermanagement/users.html',
            controller: 'userManagementCtrl'
        })
        .when('/agriculture/issueseedlicense', {
            templateUrl: 'modules/DepartOfAgriculture/issueseedlicense.html',
            controller: 'issueseedCtrl'
        })
        .otherwise({
            redirectTo: '/skm/home'
        }); 
});