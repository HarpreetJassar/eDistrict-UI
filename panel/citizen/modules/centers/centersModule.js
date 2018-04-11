angular.module('centersModule', ['authServices', 'configServices', 'notificationServices'])

.controller('centersCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope, 
    Auth,
    CentersFactory,
    Notification) {

        $scope.cen = {};
        $scope.cen.center_state = "3";
        $scope.cen.center_district = $rootScope.districtID;
        // $scope.cen.center_admin = "";

        CentersFactory.fetchEntity({
            selectfrom: "district_lgd",
            selectby: "",
            selectionparam: "3",
            selectionparam1: ""
        }).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.districts = t; 
            });  
        });

        CentersFactory.fetchEntity({
            selectfrom: "sub_district_lgd",
            selectby: "",
            selectionparam: $rootScope.districtID,
            selectionparam1: ""
        }).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.sub_districts = t; 
            });  
        });
        CentersFactory.fetchEntity({
            selectfrom: "block_lgd",
            selectby: "",
            selectionparam: $rootScope.districtID,
            selectionparam1: ""
        }).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.blocks = t; 
            });  
        });

        $scope.$watch('cen.center_sub_district', function () {
            CentersFactory.fetchEntity({
                selectfrom: "village_lgd",
                selectby: "subDistrictCode",
                selectionparam: $scope.cen.center_sub_district,
                selectionparam1: ""
            }).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.villages = t; 
                });  
            });
        });

        $scope.addCenter = function() {
            CentersFactory.add({obj: $scope.cen}).then(function(data) {
                console.log(data.data);
                if(data.data.response == "1") {
                    Notification.success('Success!', 'The SKM Center Has Been Created.');
                    fetchCenters();
                } 
                else {
                    Notification.error('Oops!', data.data.sys_message);                    
                }
            });
        }

        var fetchCenters = function() {
            CentersFactory.fetch({obj: {
                selectFrom: "skm_center",
                selectBy: "district_manager",
                selectionParam: ""
            }}).then(function(data) {
                $scope.centers = data.data.data;
            });
        };

        fetchCenters();
})

.factory('CentersFactory', function($http, Config) {
    var centers_factory = {};

    centers_factory.add = function(data) {
        return $http.post(Config.base_url + 'ModuleSKM/serSkm.asmx/createSKCenter', data);
    };

    centers_factory.fetch = function(data) {
        return $http.post(Config.base_url + 'ModuleSKM/serSkm.asmx/skEntitySelect', data);
    };
    
    centers_factory.fetchEntity = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnFetchMdata', data);
    };

    return centers_factory;
});