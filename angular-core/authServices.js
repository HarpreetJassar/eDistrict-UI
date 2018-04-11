angular.module('authServices', [])

    .factory('Auth', function ($http, AuthToken) {
        var authFactory = {};
        authFactory.login = function (loginData) {
            return $http.post('http://52.172.30.211:81/edistservices/ModuleCommon/serAuth.asmx/authenticateUser', loginData).then(function (data) {
                $.each(data.data, function(key, value) {
                    var t = data.data[0];
                    if (t.response) {
                        AuthToken.setToken(t.token, JSON.stringify(t));   
                    }  
                });
                return data;
            });
        };

        authFactory.signup = function (regData) {
            return $http.post('http://52.172.30.211:81/edistservices/ModuleCitizen/serCitizen.asmx/serfnRegisterCitizen', regData).then(function (data) {
                $.each(data.data, function(key, value) {
                    var t = data.data[0];
                    if (t.response) {
                        AuthToken.setToken(t.token, {});   
                    }  
                });
                return data;
            });
        };

        authFactory.otpVerify = function (otp) {
            return $http.post('http://52.172.30.211:81/edistservices/ModuleCitizen/serCitizen.asmx/serfnValidateOtp', otp);
        };

        authFactory.otpResend = function (otp) {
            return $http.post('http://52.172.30.211:81/edistservices/ModuleCitizen/serCitizen.asmx/serfnResendOTP', otp);
        };

        authFactory.isLoggedIn = function () {
            if (AuthToken.getToken() && AuthToken.getData()) {
                return true;
            } else {
                return false;
            }
        };

        authFactory.logout = function () {
            AuthToken.removeToken();
        };

        return authFactory;
    })

    .factory('AuthToken', function ($window) {
        var authTokenFactory = {};

        authTokenFactory.setToken = function (token, data) {
            $window.localStorage.setItem('token', token);
            $window.localStorage.setItem('data', data);
        };

        authTokenFactory.getData = function () {
            return $window.localStorage.getItem('data');
        };

        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        authTokenFactory.removeToken = function () {
            $window.localStorage.removeItem('token');
        };

        return authTokenFactory;
    })

    .factory('AuthInterceptors', function (AuthToken) {
        var authInterceptorsFactory = {};

        authInterceptorsFactory.request = function (config) {
            var token = AuthToken.getToken();

            if (token) config.headers['x-access-token'] = token;

            return config;
        };

        return authInterceptorsFactory;
    })

    // .factory('myHttpInterceptor', function ($q) {
    //     return function (promise) {
    //         return promise.then(function (response) {
    //             // do something on success
    //             if(response.headers()['content-type'] === "application/json; charset=utf-8"){
    //                 // Validate response if not ok reject
    //                 response.data.d = JSON.parse(response.data.d);
    //                 return response;
    //             }
    //             return response;
    //         }, function (response) {
    //             // do something on error
    //             return $q.reject(response);
    //         });
    //     };
    // });