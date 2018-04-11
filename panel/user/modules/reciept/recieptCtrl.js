angular.module('recieptModule', ['authServices', 'configServices', 'notificationServices'])

.controller('recieptCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope,
    Auth,
    Notification) {
      
        if(!$rootScope.reciept_data || !$rootScope.appID) {
            $location.path('/citizen/home');
        }

        
});