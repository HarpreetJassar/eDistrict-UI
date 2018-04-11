angular.module('profileModule', ['authServices', 'configServices', 'notificationServices'])

.controller('profileManagementCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope,
    Auth,
    Notification,
    User) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        User.getUserProfile().then(function(data) {
            console.log(data.data);
            $scope.prof = data.data[0];
        });

        User.fetchUserAddress({ address_type: "" }).then(function (data) {
            $scope.add.address_line_1 = data.data[1].address_line_1;
            $scope.add.address_line_1_c = data.data[0].address_line_1;
        });

        $('#datapicker2').datepicker({
            format: 'dd/mm/yyyy'
        });

        $scope.update = function() {
            $scope.d = {};
            $scope.d.Profilephoto = "";
            $scope.d.Firstname = $scope.prof.first_name;
            $scope.d.Middlename = $scope.prof.middle_name;
            if (!$scope.prof.middle_name) $scope.d.Middlename = ""; 
            $scope.d.Lastname = $scope.prof.last_name;
            if (!$scope.prof.last_name) $scope.d.Lastname = ""; 
            $scope.d.Fatherfirstname = $scope.prof.father_first_name;
            $scope.d.Fathermiddlename = $scope.prof.father_middle_name;
            if (!$scope.prof.father_middle_name) $scope.d.fathermiddlename = ""; 
            $scope.d.Fatherlastname = $scope.prof.father_last_name;
            if (!$scope.prof.father_last_name) $scope.d.Fatherlastname = ""; 
            $scope.d.Motherfirstname = $scope.prof.mother_first_name;
            $scope.d.Mothermiddlename = $scope.prof.mother_middle_name;
            if (!$scope.prof.mother_middle_name) $scope.d.Mothermiddlename = ""; 
            $scope.d.Motherlastname = $scope.prof.mother_last_name;
            if (!$scope.prof.mother_middle_name) $scope.d.Motherlastname = ""; 
            $scope.d.Gender = $scope.prof.gender;
            $scope.d.Dob = $scope.prof.date_of_birth;
            $scope.d.Age = $scope.prof.age;
            $scope.d.Placeofbirth = $scope.prof.place_of_birth;
            $scope.d.Maritalstatus = $scope.prof.marital_status;
            $scope.d.Firstnamepunjabi = "";
            $scope.d.Middlenamepunjabi = "";
            $scope.d.Lastnamepunjabi = "";
            $scope.d.Fatherfirstnamepunjabi = "";
            $scope.d.Fathermiddlenamepunjabi = "";
            $scope.d.Fatherlastnamepunjabi = "";
            $scope.d.Motherfirstnamepunjabi = "";
            $scope.d.Mothermiddlenamepunjabi = "";
            $scope.d.Motherlastnamepunjabi = "";
            $scope.d.Genderpunjabi = "";
            $scope.d.Placeofbirthpunjabi = "";
            $scope.d.Maritalstatuspunjabi = "";
            var d1 = new Date();
            $scope.d.date_of_birth = ($scope.prof.date_of_birth).split('/')[0] + "-" + months[($scope.prof.date_of_birth).split('/')[1]-1] + "-" + ($scope.prof.date_of_birth).split('/')[2]
            // $scope.d.date_of_birth = ($scope.prof.date_of_birth);
            $scope.d.Age = (d1.getFullYear() - ($scope.d.Dob).split("-")[2]);
            User.updateUserProfile({ obj: $scope.d}).then(function (data) {
                if (data.data[0].response == 1) {
                    Notification.success('Profile Updated!', "Your Profile has been updated.");
                    $rootScope.is_user_profile_complete = 'Y';
                } else {
                    if (data.data[0].sys_message) {
                        Notification.error('Oops!', data.data[0].sys_message);
                    }
                    else {
                        Notification.error('Oops!', data.data[0].reason);
                    }

                }
            });
        };

        $scope.add = {};
        $scope.updateAdd = function () {
            
            $scope.add.address_line_2 = "";
            $scope.add.address_line_3 = "";
            $scope.add.region = "Urban";
            $scope.add.stateID = 1;
            $scope.add.districtID = 1;
            $scope.add.tehsilID = 1;
            $scope.add.blockID = 1;
            $scope.add.villageID = 1;
            $scope.add.pincode = "123456";
            
            $scope.add.address_line_2_c = "";
            $scope.add.address_line_3_c = "";
            $scope.add.region_c = "Urban";
            $scope.add.stateID_c = 1;
            $scope.add.districtID_c = 1;
            $scope.add.tehsilID_c = 1;
            $scope.add.blockID_c = 1;
            $scope.add.villageID_c = 1;
            $scope.add.pincode_c = "123456";
            User.updateUserAddress({ obj: $scope.add }).then(function (data) {
                if (data.data[0].response == 1) {
                    Notification.success('Address Updated!', "Your Address has been updated.");
                    $rootScope.is_user_address_complete = 'Y';
                } else {
                    if (data.data[0].sys_message) {
                        Notification.error('Oops!', data.data[0].sys_message);
                    }
                    else {
                        Notification.error('Oops!', data.data[0].reason);
                    }

                }
            });
        };

    })

.factory('User', function($http, Config) {

    var user_Factory = {};

    user_Factory.getUserProfile = function() {
        return $http.post(Config.base_url + 'ModuleCitizen/serCitizen.asmx/serfnFtechUserProfile', {});
    };

    user_Factory.updateUserProfile = function(data) {
        return $http.post(Config.base_url + 'ModuleCitizen/serCitizen.asmx/serfnUpdateCitizenProfile', data);
    }; 

    user_Factory.updateUserAddress = function (data) {
        return $http.post(Config.base_url + 'ModuleCitizen/serCitizen.asmx/serfnUpdateCitizenAddresses', data);
    };

    user_Factory.fetchUserAddress = function (data) {
        return $http.post(Config.base_url + 'ModuleCitizen/serCitizen.asmx/serfnFtechCitizenAddress', data);
    };

    return user_Factory;
});