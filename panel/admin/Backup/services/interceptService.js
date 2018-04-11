define(['app'], function (app) {
    app.factory('AuthToken', function ($window) {
        var authTokenFactory = {};

        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        authTokenFactory.getData = function () {
            return $window.localStorage.getItem('data');
        };

        authTokenFactory.removeToken = function () {
            $window.localStorage.removeItem('token');
        };

        authTokenFactory.isLoggedIn = function () {
            if (authTokenFactory.getToken()) {
                return true;
            } else {
                return false;
            }
        };

        authTokenFactory.logout = function () {
            authTokenFactory.removeToken();
        };

        authTokenFactory.getUser = function () {
            return authTokenFactory.getData();
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
    });
}); 