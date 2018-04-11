angular.module('historyModule', ['authServices', 'configServices'])

.controller('historyCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope, 
    Auth,
    HistoryFactory) {
        
    HistoryFactory.fetch({}).then(function(data) {
        if (typeof (data.data[0].reason) != 'undefined' && data.data[0].reason == 'NO_RESPONSE_FROM_DB') {
            $scope.empty = true;
            $scope.historys = [];
        } else if (data.data[0].response == "0" && typeof (data.data[0].reason) != 'undefined') {
            Notification.error('Oops!', data.data[0].sys_message);
            $scope.empty = true;
            $scope.historys = [];
        } else {
            $scope.historys = data.data;
        }
    });

    $scope.redirectToApplication = function(appid, url) {
        $rootScope.appID = appid;
        $location.path(url);
    };

})

.factory('HistoryFactory', function($http, Config) {
    var home_factory = {};

    home_factory.fetch = function(data) {
        return $http.post(Config.base_url + 'ModuleApp/serCommonActor.asmx/serfnActorHistory', data);
    };

    return home_factory;
});