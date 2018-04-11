angular.module('dashboardController', ['authServices', 'configServices', 'notificationServices'])

.controller('homeCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope, 
    Auth,
    HomeFactory,
    Notification) {
    $scope.empty = false;

    HomeFactory.fetchPending({}).then(function (data) {
        if (typeof (data.data[0].reason) != 'undefined' && data.data[0].reason == 'NO_RESPONSE_FROM_DB') {
            $scope.empty = true;
            $scope.pendings = [];
        } else if (data.data[0].response == "0" && typeof (data.data[0].reason) != 'undefined') {
            $scope.empty = true;
            Notification.error('Oops!', data.data[0].sys_message);
            $scope.pendings = [];
        } else {
            $scope.pendings = data.data;
        }
    });

    $scope.redirectToApplication = function(appid, url) {
        $rootScope.appID = appid;
        $location.path(url);
    };

})

.factory('HomeFactory', function($http, Config) {
    var home_factory = {};

    home_factory.fetchPending = function(data) {
        return $http.post(Config.base_url + 'ModuleApp/serCommonActor.asmx/serfnFetchPendingApplicationsActor', data);
    };

    return home_factory;
});