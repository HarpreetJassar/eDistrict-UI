angular.module('dashboardController', ['authServices', 'configServices'])

.controller('homeCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope, 
    Auth,
    DashFactory) {

        DashFactory.getServices({
            selectfrom: "services",
            selectby: "active_status",
            selectionparam: "Y",
            selectionparam1: ""
        }).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.services = t; 
            });  
        });

        $scope.redirectToService = function (n, i, t) {
            if ($rootScope.is_user_profile_complete == 'N' || $rootScope.is_user_address_complete == 'N') {
                $("#updateModal").modal('show');
            } else {
                $rootScope.service_name = n;
                $rootScope.service_id = i;
                $location.path(t);
            }
        };

        if ($rootScope.is_user_profile_complete == 'N' || $rootScope.is_user_address_complete == 'N') {
            var element = angular.element('#updateModal');
            element.modal('show');
            //$("#updateModal").modal('show');
        }

        $scope.redirectToProfile = function () {
            var element = angular.element('#updateModal');
            element.modal('hide');
            //$("#updateModal").modal('hide');
            //console.log("HERE");
            $location.path('/citizen/profile');
        };
})

.factory('DashFactory', function($http, Config) {
    var dash_factory = {};
    dash_factory.getServices = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnFetchMdata', data)
    };
    return dash_factory;
});