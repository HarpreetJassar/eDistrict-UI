angular.module('authServices', ['configServices'])

.factory('Auth', function($http, AuthToken, Config) {
    var authFactory = {};

    authFactory.isLoggedIn = function() {
        if (AuthToken.getToken() && AuthToken.getUser()) {
            return true;
        } else {
            return false;
        }
    };


    authFactory.logout = function(e) {
        AuthToken.removeToken();
    };

    authFactory.getUser = function() {
        if (AuthToken.getToken() && AuthToken.getUser()) {
            return AuthToken.getUser();
        } else {
            $q.reject({
                message: "User has no Token"
            });
        }
    };

    authFactory.getMenu = function() {
        return $http.post(Config.base_url + 'ModuleCommon/serGetMenu.asmx/fetchUserMenu', {});
    };

    return authFactory;
})

.factory('AuthToken', function($window) {
    var authTokenFactory = {};

    authTokenFactory.setToken = function(token) {
        $window.localStorage.setItem('token', token);
            $window.localStorage.setItem('data', data);
    };

    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    };

    authTokenFactory.getUser = function() {
        return $window.localStorage.getItem('data');
    };

    authTokenFactory.removeToken = function() {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('data');
    };

    return authTokenFactory;
})

.factory('AuthInterceptors', function(AuthToken) {
    var authInterceptorsFactory = {};

    authInterceptorsFactory.request = function(config) {
        var token = AuthToken.getToken();

        if (token) config.headers['x-access-token'] = token;

        return config;
    };

    return authInterceptorsFactory;
});