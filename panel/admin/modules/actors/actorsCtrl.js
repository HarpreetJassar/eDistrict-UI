angular.module('actorsController', ['authServices', 'configServices', 'notificationServices'])

.controller('actorManagementCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope,
    Auth,
    ActorFactory,
    Notification) {
        var d = {
            selectfrom: "department",
            selectby: "all",
            selectionparam: "",
            selectionparam1: ""
        };
        ActorFactory.fetch(d).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.departs = t; 
            });  
        });
        var d = {
            selectfrom: "district",
            selectby: "stateID",
            selectionparam: "1",
            selectionparam1: ""
        };
        ActorFactory.fetch(d).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.dists = t; 
            });  
        });

        var fetchOp = function () {
            var d = {
                selectfrom: "office",
                selectby: "department_district",
                selectionparam: $scope.depart,
                selectionparam1: $scope.dist
            };
            ActorFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.offices = t; 
                });  
            });
            d = {
                selectfrom: "block",
                selectby: "districtID",
                selectionparam: $scope.dist,
                selectionparam1: ""
            };
            ActorFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.blocks = t; 
                });  
            });
            var d = {
                selectfrom: "designations",
                selectby: "departmentID",
                selectionparam: $scope.depart,
                selectionparam1: ""
            };
            ActorFactory.fetch(d).then(function (res) {
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

        $scope.$watch('dist', fetchOp);
        $scope.$watch('depart', fetchOp);
        $scope.$watch('act.officeid', function() {
            var d = {
                selectfrom: "actor",
                selectby: "officeID",
                selectionparam: $scope.act.officeid,
                selectionparam1: ""
            };
            ActorFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.actors = t; 
                });  
            });
        });

        $scope.addActor = function() {
            $scope.act.FirstName = "";
            $scope.act.MiddleName = "";
            $scope.act.LastName = "";
            $scope.act.DeptId = $scope.depart;    
            $scope.act.UserType = "actor";    
            if($scope.act.IsmasterAccount == "Y") {
                $scope.act.operationlevel = "district";
                $scope.act.operationlevelrefid = $scope.dist;
                $scope.act.UserPID = "0";
            }
            if($scope.act.operationlevel == 'district') $scope.act.operationlevelrefid = $scope.dist;
            else if($scope.act.operationlevel == 'block') {
                $scope.act.operationlevelrefid = $scope.block2;
            }
            ActorFactory.addActor($scope.act).then(function (data) {
                $.each(data.data, function(key, value) {
                    data.data = (JSON.parse(value)[0]);
                });
                if (data.data.response == "1") {
                    Notification.success("Created!", "The Actor has been created.");
                } else if (data.data.response == "0" && data.data.reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                } 
                else {
                    Notification.error("Oops!", data.data.reason);
                }
            });
        };

})

.controller('actorRolesCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope,
    Auth,
    ActorFactory,
    Notification) {
        var d = {
            selectfrom: "department",
            selectby: "all",
            selectionparam: "",
            selectionparam1: ""
        };
        ActorFactory.fetch(d).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.departs = t; 
            });  
        });

        var d = {
            selectfrom: "district",
            selectby: "stateID",
            selectionparam: "1",
            selectionparam1: ""
        };
        ActorFactory.fetch(d).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.dists = t; 
            });  
        });

        var fetchOp = function () {
            var d = {
                selectfrom: "office",
                selectby: "department_district",
                selectionparam: $scope.depart,
                selectionparam1: $scope.dist
            };
            ActorFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.offices = t; 
                });  
            });
            var d = {
                selectfrom: "services",
                selectby: "department_id",
                selectionparam: $scope.depart,
                selectionparam1: ""
            };
            ActorFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.services = t; 
                });  
            });
            // d = {
            //     selectfrom: "block",
            //     selectby: "districtID",
            //     selectionparam: $scope.dist,
            //     selectionparam1: ""
            // };
            // ActorFactory.fetch(d).then(function (res) {
            //     $.each(res.data, function(key, value) {
            //         t = (JSON.parse(value));
            //         if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
            //             Auth.logout();
            //             $window.location.href = '../../index.html';
            //         }
            //         $scope.blocks = t; 
            //     });  
            // });
            // var d = {
            //     selectfrom: "designations",
            //     selectby: "departmentID",
            //     selectionparam: $scope.depart,
            //     selectionparam1: ""
            // };
            // ActorFactory.fetch(d).then(function (res) {
            //     $.each(res.data, function(key, value) {
            //         t = (JSON.parse(value));
            //         if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
            //             Auth.logout();
            //             $window.location.href = '../../index.html';
            //         }
            //         $scope.desigs = t; 
            //     });  
            // });
        };

        $scope.$watch('dist', fetchOp);
        $scope.$watch('depart', fetchOp);

        $scope.$watch('office', function() {
            var d = {
                selectfrom: "actor",
                selectby: "officeID",
                selectionparam: $scope.office,
                selectionparam1: ""
            };
            ActorFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.actors = t; 
                });  
            });
        });

        $scope.$watch('ac_role.serviceid', function() {
            var d = {
                selectfrom: "role",
                selectby: "serviceID",
                selectionparam: $scope.ac_role.serviceid,
                selectionparam1: ""
            };
            ActorFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.roles = t; 
                });  
            });
        });

        $scope.addActorRoleMap = function() {
            ActorFactory.addActorRoleMap($scope.ac_role).then(function(data) {
                $.each(data.data, function(key, value) {
                    data.data = (JSON.parse(value)[0]);
                });
                if (data.data.response == "1") {
                    Notification.success("Created!", "The Map has been created.");
                } else if (data.data.response == "0" && data.data.reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                } 
                else {
                    Notification.error("Oops!", data.data.reason);
                }
            });
        };
        
    })

.controller('rolesNavigationCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope) {
        
})

.factory('ActorFactory', function($http, Config) {

    var Dept_Factory = {};

    Dept_Factory.addActor = function(data) {
        return $http.post(Config.base_url + 'ModuleCommon/serAuth.asmx/serfnRegisterUser', data);
    };

    Dept_Factory.addActorRoleMap = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnInsertMappingServicerRoleUser', data);
    };

    Dept_Factory.addOffice = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnCreateOffice', data);
    };

    Dept_Factory.fetch = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnFetchMdata', data);
    };

    return Dept_Factory;
});