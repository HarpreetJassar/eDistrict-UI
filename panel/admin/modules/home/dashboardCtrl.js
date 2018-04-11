angular.module('dashboardController', ['authServices'])

.controller('homeCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope, 
    Auth) {
    $scope.main = [];
    Auth.getMenu().then(function (res) {
        $.each(res.data, function(key, value) {
            var menu = JSON.parse(value);
            for(var i = 0; i < (menu).length; i++) {
                if($scope.menu[i].hirarchyLevel == "1" && $scope.menu[i].displayName != 'Dashboard') {
                    ($scope.main).push($scope.menu[i]);
                }
            }
        });
    });
    

});