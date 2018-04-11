angular.module('edistSKM', [
    'appRoutes',
    'ngProgress',
    'mainController',
    'authServices',
    'configServices',
    'dashboardController',
    'centersModule',
    'userManagementModule',
    'agricultureModule',
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