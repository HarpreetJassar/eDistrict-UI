angular.module('edistrictLogin', [
    'authServices',
    'notificationServices'
])

    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
        // $httpProvider.interceptors.push('myHttpInterceptor');
    })

    .controller('loginCtrl', function ($scope, $window, Auth, Notification) {
        $scope.doLogin = function () {
            $scope.Loading = true;
            $("#loginForm").slideUp("medium");
            $scope.FormDisable = true;
            var obj = {obj: $scope.loginData};
            Auth.login(obj).then(function (data) {
                if (data.data[0].response == "1") {
                    $scope.Loading = false;
                    if(data.data[0].user_type == "citizen" && data.data[0].is_mobile_verified == "N") {
                        window.location.href = 'otp.html'
                    } else {
                        if(data.data[0].user_type != "actor" && data.data[0].user_type != "admin") {
                            data.data[0].user_type = "user";
                        }
                        window.location.href = '/ui/panel/'+(data.data[0].user_type).toLowerCase()+'/index.html'
                    }
                } else {
                    $scope.Loading = false;
                    $("#loginForm").slideDown("medium");
                    $scope.FormDisable = false;
                    Notification.error("Oops!", data.data[0].reason);
                }
            });
        }
    })

    .controller('regCtrl', function($scope, $window, Auth, Notification) {
        Offline.check();
        $scope.regUser = function() {
            $scope.Loading = true;
            $("#regForm").slideUp("medium");
            $scope.FormDisable = true;
            $scope.reg.firstnamepunjabi = "";
            $scope.reg.middlenamepunjabi = "";
            $scope.reg.lastnamepunjabi = "";
            /*
                Added by: -  Abhineet on 29/03/2018
                Purpose: - Validation for empty value in below 2 fields
            */
            if (!$scope.reg.middlename) {
                $scope.reg.middlename = "";
            }
            // if (!$scope.reg.lastname) {
            //     $scope.reg.lastname = "";
            // }
            var obj = {obj: $scope.reg};            
            Auth.signup(obj).then(function (data) {
                if (data.data[0].response == "1") {
                    $scope.Loading = false;
                    window.location.href = 'otp.html'
                } else {
                    $scope.Loading = false;
                    $("#regForm").slideDown("medium");
                    $scope.FormDisable = false;
                    Notification.error("Oops!", data.data[0].reason);
                }
            });
        }

        $scope.checkOTP = function() {
            var obj = {obj: $scope.o};
            Auth.otpVerify(obj).then(function (data) {
                if (data.data[0].response == "1") {
                    $scope.Loading = false;
                    window.location.href = 'index.html'
                } else {
                    $scope.Loading = false;
                    $scope.FormDisable = false;
                    Notification.error("Oops!", data.data[0].reason);
                }
            });
        };

        $scope.resendOTP = function() {
            Auth.otpResend({}).then(function (data) {
                if (data.data[0].response == "1") {
                    Notification.success('OTP Sent', "The OTP has been sent to your registered mobile number for verification.");
                } else {
                    Notification.error("Oops!", data.data[0].reason);
                }
            });
        };
    });