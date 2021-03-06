angular.module('configServices', ['authServices'])

.factory('Config', function($http, AuthToken) {
    return {
        "base_url": "http://52.172.30.211:81/edistservices/",
        "download_url": "http://52.172.30.211:81/uploads/applications/",
        "skm_url": "http://52.172.30.211:82/edistservices/",
        "format_json": function(j) {
            $.each(j, function(key, value) {
                var t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    AuthToken.removeToken();
                    $window.location.href = '../../index.html';
                } else {
                    return t;
                }
            });
        }
      };
});