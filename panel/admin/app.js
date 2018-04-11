angular.module('edistAdmin', [
    'appRoutes',
    'ngProgress',
    'mainController',
    'authServices',
    'configServices',
    'mdmModule',
    'dashboardController',
    'servicesController',
    'actorsController',
    'notificationServices',
    'naif.base64'
])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
})

.run(function($rootScope, Auth, $window) {
    if (Auth.isLoggedIn()) {
        var data = JSON.parse(Auth.getUser());
    } else {
        $window.location.href = '../../index.html';
    }
});