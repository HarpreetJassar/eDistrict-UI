angular.module('mdmModule', ['authServices', 'configServices', 'notificationServices'])

.controller('departmentCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope,
    Notification, 
    DeptFactory, 
    Config,
    Auth) {
    
    $scope.addDept = function() {
        DeptFactory.add($scope.dept).then(function(data) {
            $.each(data.data, function(key, value) {
                data.data = (JSON.parse(value)[0]);
            });
            if (data.data.response == "1") {
                Notification.success("Created!", "The Department has been created.");
            } else {
                Notification.error("Oops!", data.data.reason);
            }
            fetch();
        });
    };

    var fetch = function() {
        var d = {
            selectfrom: "department",
            selectby: "all",
            selectionparam: "",
            selectionparam1: ""
        };
        DeptFactory.fetch(d).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.departs = t; 
                console.log(t);
            });  
        });
    };
    fetch();

    $scope.redirect = function (id, name) {
        $location.path( "/admin/master/departments/"+id+"/"+name );
    };

    $scope.redirectOffice = function (id, name) {
        $location.path( "/admin/master/departments/office/"+id+"/"+name );
    };
})

.controller('departDesigCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope,
    $routeParams,
    DeptFactory,
    Notification) {
        $scope.name = $routeParams.name;

        var fetchDesig = function() {
            var d = {
                selectfrom: "designations",
                selectby: "departmentID",
                selectionparam: $routeParams.departId,
                selectionparam1: ""
            };
            DeptFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.desigs = t; 
                });  
            });
        };
        fetchDesig();

        $scope.addDesig = function () {
            $scope.des.departmentid = $routeParams.departId;
            DeptFactory.addDesig($scope.des).then(function(data) {
                $.each(data.data, function(key, value) {
                    data.data = (JSON.parse(value)[0]);
                });
                if (data.data.response == "1") {
                    Notification.success("Created!", "The Designation has been created.");
                } else if (data.data.response == "0" && data.data.reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                } 
                else {
                    Notification.error("Oops!", data.data.reason);
                }
               fetchDesig();
            });
        };
})

.controller('departOfficeCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope,
    $routeParams,
    DeptFactory,
    Notification) {
        $scope.name = $routeParams.name;

        $scope.addOffice = function () {
            if($scope.off.operationlevel == 'district') $scope.off.operationrefid = $scope.dist;
            else if($scope.off.operationlevel == 'block') {
                $scope.off.operationrefid = $scope.block2;
            }
            $scope.off.departmentid = $routeParams.departId;
            $scope.off.parentofficeid = "0";
            DeptFactory.addOffice($scope.off).then(function(data) {
                $.each(data.data, function(key, value) {
                    data.data = (JSON.parse(value)[0]);
                });
                if (data.data.response == "1") {
                    Notification.success("Created!", "The Office has been created.");
                } else if (data.data.response == "0" && data.data.reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                } 
                else {
                    Notification.error("Oops!", data.data.reason);
                }
            });
        };

        var fetchOp = function () {
            var d = {
                selectfrom: "district",
                selectby: "stateID",
                selectionparam: "1",
                selectionparam1: ""
            };
            DeptFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.dists = t; 
                });  
            });
            d = {
                selectfrom: "block",
                selectby: "districtID",
                selectionparam: $scope.dist,
                selectionparam1: ""
            };
            DeptFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.blocks = t; 
                });  
            });
        };

        $scope.$watch('dist', fetchOp);

        // var getoffices = function() {
        //     var d = {
        //         selectfrom: "designations",
        //         selectby: "departmentID",
        //         selectionparam: $routeParams.departId,
        //         selectionparam1: ""
        //     };
        //     DeptFactory.fetch(d).then(function (res) {
        //         $.each(res.data, function(key, value) {
        //             t = (JSON.parse(value));
        //             if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
        //                 Auth.logout();
        //                 $window.location.href = '../../index.html';
        //             }
        //             $scope.offices = t; 
        //         });  
        //     });
        // };
})

.controller('geographicalCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope) {

})

.controller('masterHomeCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope) {

})

.factory('DeptFactory', function($http, Config) {

    var Dept_Factory = {};

    Dept_Factory.add = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnRegisterDepartment', data);
    };

    Dept_Factory.addDesig = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnCreateDesignations', data);
    };

    Dept_Factory.addOffice = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnCreateOffice', data);
    };

    Dept_Factory.fetch = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnFetchMdata', data);
    };

    return Dept_Factory;
});