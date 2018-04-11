angular.module('agricultureModule', ['authServices', 'configServices', 'notificationServices'])

.controller('issueseedCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope,
    Notification, 
    AgricultureFactory, 
    Config,
    Auth) {
        $scope.d_u = Config.download_url;
        if(!$rootScope.appID) {
            $location.path('/actor/home');
        } else {
            $scope.check = false
            AgricultureFactory.fetch({ appid: $rootScope.appID }).then(function (data) {
                    console.log(data.data[3]);
                    $scope.personal_details = data.data[0][0];
                    $scope.personal_details.name = $scope.personal_details.first_name + " " + $scope.personal_details.middle_name + " " + $scope.personal_details.last_name;
                    $scope.address_details = data.data[1][0];
                    $scope.application_details = data.data[2][0];
                    $scope.seeds = data.data[3];
                    $scope.storages = data.data[4];
                    $scope.images = data.data[6];
            });

            /*
                ADDED BY: - Abhineet Bhatnagar on 30-03-2018
                PURPOSE: - To add application activity trail
            */
            AgricultureFactory.fetchActivityTrail({ appid: $rootScope.appID }).then(function (data) {
                $scope.activityTrail = data.data;
            });

            AgricultureFactory.fetchActions({appid: $rootScope.appID}).then(function(data) {
                $scope.actions = data.data;
                if(data.data[0].response == "1") {
                    $scope.check = true;
                } 
            });
        }
        $scope.takeAction = function() {
            $scope.s_data.applicationID = $rootScope.appID;
            if(!$scope.s_data.action_remark) $scope.s_data.action_remark = "";
            AgricultureFactory.takeAction({obj: $scope.s_data}).then(function(data) {
                console.log(data.data);
                if(data.data[0].response == 1) {
                    if(typeof(data.data[0].license_status) != 'undefined' && data.data[0].license_status == 'Approved') {
                        Notification.success('License Generated!', "Your license number is " + data.data[0].licenseID);
                        $location.path('/actor/home');
                    } else if (typeof(data.data[0].license_status) != 'undefined' && data.data[0].license_status == 'Rejected') {
                        Notification.info('License Rejected', "The License corresponding to App. No. "+$rootScope.appID+" has been rejected.");
                    } else {
                        Notification.success('Action Taken!', "Your selected action has been performed.");
                        // $rootScope.reciept_data = data.data[0];
                        $location.path('/actor/home');
                    }
                } else {
                    if(data.data[0].sys_message){
                        Notification.error('Oops!', data.data[0].sys_message);
                    }
                    else{
                        Notification.error('Oops!', data.data[0].reason);
                    }
                    
                }
            });
        };
})

.factory('AgricultureFactory', function($http, Config) {
    var Agri_Factory = {};
    Agri_Factory.fetchActions = function(data) {
        return $http.post(Config.base_url + 'ModuleApp/serCommonActor.asmx/serfnFetchActorActions', data);
    };
    Agri_Factory.takeAction = function(data) {
        return $http.post(Config.base_url + 'ModuleApp/serCommonActor.asmx/serfnActorAcionsOnApp', data);
    };
    Agri_Factory.fetch = function(data) {
        return $http.post(Config.base_url + 'ModuleCitizen/serAgriculture.asmx/serfnFetchApplicationsDetails', data);
    };
    Agri_Factory.s_pay = function(data) {
        return $http.post(Config.base_url + 'ModuleCommon/serPayment.asmx/serfnSavePaymentCitizen', data);
    };

    /*
        ADDED BY: - Abhineet Bhatnagar on 30-03-2018
        PURPOSE: - To add application activity trail
    */
    Agri_Factory.fetchActivityTrail = function (data) {
        return $http.post(Config.base_url + 'ModuleCitizen/serAgriculture.asmx/serfnFetchApplicationsTrail', data);
    };
    return Agri_Factory;
});