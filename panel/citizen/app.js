angular.module('edistAdmin', [
    'appRoutes',
    'ngProgress',
    'mainController',
    'authServices',
    'configServices',
    'agricultureModule',
    'dashboardController',
    'profileModule',
    'historyModule',
    'centersModule',
    'userManagementModule',
    'notificationServices',
    'recieptModule',
    'naif.base64'
])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
})

.run(function($rootScope, Auth, $window) {
    if (Auth.isLoggedIn()) {
        Auth.validateToken().then(function (data) {
            if(data.data[0].response == "0") {
                Auth.logout();
                $window.location.href = '../../index.html';
            }
        });
        var data = JSON.parse(Auth.getUser());
    } else {
        $window.location.href = '../../index.html';
    }
})

.directive('emptyToNull', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.$parsers.push(function(viewValue) {
                if(viewValue === "" || viewValue === null) {
                    return '';
                }
                return viewValue;
            });
        }
    };
});