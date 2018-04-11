angular.module('mainController', ['authServices'])

.controller('mainCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope,
    $interval,
    ngProgressFactory,
    Auth) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };

    $rootScope.progressbar = ngProgressFactory.createInstance();
    $rootScope.progressbar.setColor('#fff');
    $scope.$on('$routeChangeStart', function(next, current) {
        $rootScope.progressbar.start();
        Auth.validateToken().then(function (data) {
            if(data.data[0].response == "0") {
                Auth.logout();
                $window.location.href = '../../index.html';
            }
        });
    });
    $scope.$on('$routeChangeSuccess', function(next, current) {
        $rootScope.progressbar.complete();
    });

    // $scope.setSubMenu = function (i) {
    //     if(($rootScope.menu[i].SubMenu).length) {
            
    //     }
    // };

    if (Auth.isLoggedIn()) {
        $rootScope.menu = [];
        var data = JSON.parse(Auth.getUser());
        $rootScope.u_name = data.f_name + " " + data.m_name + " " + data.l_name;
        $rootScope.desig = data.desig_name;
        $rootScope.depart = data.dept_name;
        Auth.getMenu().then(function (res) {
            $.each(res.data, function(key, value) {
                $rootScope.menu = (JSON.parse(value));
            });
        });
    } else {
        // $window.location.href = '/Admin/Login';
    }

    // var loginCheck = $interval(function() {
    //     var current = Math.floor(Date.now() / 1000);
    //     if (($scope.exp - current) < 0) {
    //         $("#logoutModal").modal('show');
    //     }
    // }, 1000);

    $scope.makeFullScreen = function () {
        var el = document.documentElement
            , rfs = // for newer Webkit and Firefox
            el.requestFullScreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
            || el.msRequestFullScreen
        ;
        if(typeof rfs!=="undefined" && rfs){
            rfs.call(el);
        } else if(typeof window.ActiveXObject!=="undefined"){
            // for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript!=null) {
                wscript.SendKeys("{F11}");
            }
        }
    };

    // Logout Function
    $scope.doLogout = function() {
        Auth.logout();
        $window.location.href = '../../index.html';
    };
});