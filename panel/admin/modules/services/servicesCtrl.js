angular.module('servicesController', ['authServices', 'configServices', 'notificationServices', 'mdmModule'])

.controller('engineCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope,
    DeptFactory,
    ServiceFactory,
    Auth,
    Notification) {
        var fetchDepts = function() {
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
                });  
            });
        };
        fetchDepts();

        $scope.addService = function () {
            $scope.service.parentserviceid = "0";
            ServiceFactory.add($scope.service).then(function(data) {
                $.each(data.data, function(key, value) {
                    data.data = (JSON.parse(value)[0]);
                });
                if (data.data.response == "1") {
                    Notification.success("Created!", "The Service has been created. ");
                } else {
                    Notification.error("Oops!", data.data.reason);
                }
                fetch();
            });
        }

        var fetch = function() {
            var d = {
                selectfrom: "services",
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
                    $scope.services = t; 
                    console.log(t);
                });  
            });
        };
        fetch();

        $scope.openSubService = function (sid, did, sname) {
            $scope.ss = {};
            $scope.ss.parentserviceid = sid;
            $scope.ss.departmentid = did;
            $scope.ss_name = sname;
            $("#myModal").modal('show');
        };

        $scope.addSubService = function (sid, did, sname) {
            ServiceFactory.add($scope.ss).then(function(data) {
                $.each(data.data, function(key, value) {
                    data.data = (JSON.parse(value)[0]);
                });
                if (data.data.response == "1") {
                    Notification.success("Created!", "The Service has been created. ");
                    $("#myModal").modal('hide');
                } else {
                    Notification.error("Oops!", data.data.reason);
                }
                fetch();
            });
        };
})

.controller('navigationCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope,
    ServiceFactory,
    Notification) {
        var d = {
            selectfrom: "services",
            selectby: "all",
            selectionparam: "",
            selectionparam1: ""
        };
        ServiceFactory.fetch(d).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.services = t; 
            });  
        });   

        var fetchServiceMenu = function () {
            if($scope.nav.serviceid) {
                var d = {
                    selectfrom: "menu",
                    selectby: "serviceID",
                    selectionparam: $scope.nav.serviceid,
                    selectionparam1: ""
                };
                ServiceFactory.fetch(d).then(function (res) {
                    $.each(res.data, function(key, value) {
                        t = (JSON.parse(value));
                        if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                            Auth.logout();
                            $window.location.href = '../../index.html';
                        }
                        $scope.ServiceMenu = t; 
                    });  
                });
            } else {
                $scope.ServiceMenu = []; 
            }
        };

        $scope.$watch('nav.serviceid', fetchServiceMenu);
        $scope.$watch('serviceid', function () {
            var d = {
                selectfrom: "menu",
                selectby: "serviceID",
                selectionparam: $scope.serviceid,
                selectionparam1: ""
            };
            ServiceFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.ServiceMenuView = t; 
                });  
            });
        });

        $scope.addItem = function () {
            $scope.nav.isservicespecific = "";
            $scope.nav.isuniquefortheservice = "";
            ServiceFactory.addItem($scope.nav).then(function (data) {
                $.each(data.data, function(key, value) {
                    data.data = (JSON.parse(value)[0]);
                });
                if (data.data.response == "1") {
                    Notification.success("Created!", "The Item has been created.");
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

.controller('rolesCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope, 
    Auth,
    ServiceFactory,
    Notification) {
        var fetchService = function() {
            var d = {
                selectfrom: "services",
                selectby: "all",
                selectionparam: "",
                selectionparam1: ""
            };
            ServiceFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.services = t; 
                });  
            });
        };
        fetchService();

        var fetchRoles = function () {
            if($scope.serviceid) {
                var d = {
                    selectfrom: "role",
                    selectby: "serviceID",
                    selectionparam: $scope.serviceid,
                    selectionparam1: ""
                };
                ServiceFactory.fetch(d).then(function (res) {
                    $.each(res.data, function(key, value) {
                        t = (JSON.parse(value));
                        if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                            Auth.logout();
                            $window.location.href = '../../index.html';
                        }
                        $scope.Roles = t; 
                    });  
                });
            } else {
                $scope.Roles = []; 
            }
        };

        $scope.$watch('serviceid', fetchRoles);

        $scope.addRole = function () {
            ServiceFactory.addRole($scope.role).then(function(data) {
                $.each(data.data, function(key, value) {
                    data.data = (JSON.parse(value)[0]);
                });
                if (data.data.response == "1") {
                    Notification.success("Created!", "The Role has been created.");
                } else if (data.data.response == "0" && data.data.reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                } 
                else {
                    Notification.error("Oops!", data.data.reason);
                }
                fetchRoles();
            });
        };

        $scope.redirect = function(r, name) {
            $location.path( "/admin/services/services-roles-actions/"+$scope.serviceid+"/"+r+"/"+name );
        }
})

.controller('roleActionCtrl', function($location,
    $scope,
    $window,
    $timeout,
    $rootScope, 
    Auth,
    ServiceFactory,
    Notification,
    $routeParams) {
        $scope.role = $routeParams.roleId;
        $scope.name = $routeParams.name;
        var d = {
            selectfrom: "role",
            selectby: "serviceID",
            selectionparam: $routeParams.serviceId,
            selectionparam1: ""
        };
        ServiceFactory.fetch(d).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.Roles = t; 
            });  
        });

        d = {
            selectfrom: "service_stage",
            selectby: "serviceID",
            selectionparam: $routeParams.serviceId,
            selectionparam1: ""
        };
        ServiceFactory.fetch(d).then(function (res) {
            $.each(res.data, function(key, value) {
                t = (JSON.parse(value));
                if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                }
                $scope.stages = t;
            });  
        });

        $scope.addAction = function () {
            if($scope.action.sendsmstocitizen == 'N') {
                $scope.action.smstext = "";
            }
            if($scope.action.actiontype != 'R') {
                $scope.action.refroleid = 0;
            }
            $scope.action.roleid = $routeParams.roleId;
            $scope.action.serviceid = $routeParams.serviceId;
            $scope.action.isinterflowredirect = "";
            ServiceFactory.addAction($scope.action).then(function(data) {
                $.each(data.data, function(key, value) {
                    data.data = (JSON.parse(value)[0]);
                });
                if (data.data.response == "1") {
                    Notification.success("Created!", "The Action has been created.");
                } else if (data.data.response == "0" && data.data.reason == "TOKEN_EXPIRED") {
                    Auth.logout();
                    $window.location.href = '../../index.html';
                } 
                else {
                    Notification.error("Oops!", data.data.reason);
                }
               fetchActions();
            });
        }

        var fetchActions = function () {
            var d = {
                selectfrom: "role_action",
                selectby: "roleID",
                selectionparam: $routeParams.roleId,
                selectionparam1: ""
            };
            ServiceFactory.fetch(d).then(function (res) {
                $.each(res.data, function(key, value) {
                    t = (JSON.parse(value));
                    if (t[0].response == "0" && t[0].reason == "TOKEN_EXPIRED") {
                        Auth.logout();
                        $window.location.href = '../../index.html';
                    }
                    $scope.Actions = t;
                });  
            });
        };

        fetchActions();

})

.factory('ServiceFactory', function($http, Config) {

    var Service_Factory = {};

    Service_Factory.add = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnInsertMasterService', data);
    };

    Service_Factory.addRole = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnInsertMasterServiceRole', data);
    };

    Service_Factory.addAction = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnInsertMasterServiceRoleAction', data);
    };

    Service_Factory.addItem = function(data) {
        return $http.post(Config.base_url + 'ModuleCommon/serGetMenu.asmx/serfnInsertMenuMaster', data);
    };

    Service_Factory.fetch = function(data) {
        return $http.post(Config.base_url + 'ModuleAdmin/serMastersData.asmx/serfnFetchMdata', data);
    };

    return Service_Factory;
});