angular.module('userManagementModule', ['authServices', 'configServices', 'notificationServices'])

.controller('userManagementCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope, 
    Auth,
    UserManagementFactory,
    Notification) {

        $scope.user = {};
        if($rootScope.user_type == 'skm') {
            $scope.user.user_type = "skmadmin";
        } 
        if($rootScope.user_type == 'skmadmin') {
            $scope.user.user_type = "skmop";
        }

        $scope.user.is_master_account = "N";

        UserManagementFactory.fetch({obj: {
            selectFrom: "skm_center",
            selectBy: "district_manager",
            selectionParam: ""
        }}).then(function(data) {
            $scope.centers = data.data.data;
        });

        $scope.addUser = function() {
            UserManagementFactory.add({obj: $scope.user}).then(function (data) {
                if(data.data.response == "1") {
                    Notification.success("Added!", "The user has been added successfuly.");
                    fetchUsers();
                }
                else {
                    Notification.error("Oops!", data.data.sys_message);
                }
            });
        };

        var fetchUsers = function() {
            UserManagementFactory.fetch({obj: {
                selectFrom: "skm_user",
                selectBy: "parent_id",
                selectionParam: ""
            }}).then(function(data) {
                $scope.users = data.data.data;
            });
        };

        fetchUsers();
        
})

.factory('UserManagementFactory', function($http, Config) {
    var usermanagement_factory = {};

    usermanagement_factory.fetch = function(data) {
        return $http.post(Config.base_url + 'ModuleSKM/serSkm.asmx/skEntitySelect', data);
    };

    usermanagement_factory.add = function(data) {
        return $http.post(Config.base_url + 'ModuleSKM/serSkm.asmx/createSKUser', data);
    };

    return usermanagement_factory;
});