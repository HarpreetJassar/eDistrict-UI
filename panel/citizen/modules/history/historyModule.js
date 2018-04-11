angular.module('historyModule', ['authServices', 'configServices'])

.controller('historyCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope, 
    Auth,
    HistoryFactory) {
    $scope.empty = false;
        
    HistoryFactory.fetch({}).then(function(data) {
        if (typeof (data.data[0].reason) != 'undefined' && data.data[0].reason == 'NO_RESPONSE_FROM_DB') {
            $scope.empty = true;
            $scope.historys = [];
        } else if (data.data[0].response == "0" && typeof (data.data[0].reason) != 'undefined') {
            Notification.error('Oops!', data.data[0].sys_message);
            $scope.historys = [];
            $scope.empty = true;
        } else {
            $scope.historys = data.data;
        }
    });

    $scope.redirectToApplication = function(appid, status, stage, url) {
        $rootScope.appID_review = appid;
        $rootScope.status_review = status;
        $rootScope.stage_review = stage;
        $location.path(url);
    };

})

.factory('HistoryFactory', function($http, Config) {
    var home_factory = {};

    home_factory.fetch = function(data) {
        return $http.post(Config.base_url + 'ModuleCitizen/serCitizen.asmx/serfnFetchCitizenApplicationsHistory', data);
    };

    return home_factory;
});