angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'modules/home/dashboard.html',
            controller: 'homeCtrl'
        })
        .when('/citizen/history', {
            templateUrl: 'modules/history/history.html',
            controller: 'historyCtrl'
        })
        .when('/citizen/profile', {
            templateUrl: 'modules/profile/profile.html',
            controller: 'profileManagementCtrl'
        })
        .when('/citizen/reciept', {
            templateUrl: 'modules/reciept/reciept.html',
            controller: 'recieptCtrl'
        })
        .when('/citizen/agriculture/issueseedlicense', {
            templateUrl: 'modules/DepartOfAgriculture/issueseedlicense.html',
            controller: 'issueseedCtrl'
        })
        .when('/citizen/agriculture/issueseedlicensereview', {
            templateUrl: 'modules/DepartOfAgriculture/issueseedlicensereview.html',
            controller: 'issueseedCtrlReview'
        })
        .when('/citizen/agriculture/fertilizerlicense', {
            templateUrl: 'modules/DepartOfAgriculture/fertilizerlicense.html',
            controller: 'fertilizerLicenceCtrl'
        })
        .when('/citizen/agriculture/fertilizerlicensereview', {
            templateUrl: 'modules/DepartOfAgriculture/fertilizerlicensereview.html',
            controller: 'fertilizerLicenceReviewCtrl'
        })
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
        .otherwise({
            redirectTo: '/home'
        }); 
});