angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/admin/home', {
            templateUrl: 'modules/home/dashboard.html',
            controller: 'homeCtrl'
        })
        
        .when('/admin/master', {
            templateUrl: 'modules/master_data/dashboard.html',
            controller: 'masterHomeCtrl'
        })
        .when('/admin/master/departments', {
            templateUrl: 'modules/master_data/department.html',
            controller: 'departmentCtrl'
        })
        .when('/admin/master/departments/:departId/:name', {
            templateUrl: 'modules/master_data/depart_desig.html',
            controller: 'departDesigCtrl'
        })
        .when('/admin/master/departments/office/:departId/:name', {
            templateUrl: 'modules/master_data/depart_office.html',
            controller: 'departOfficeCtrl'
        })
        .when('/admin/master/geographical', {
            templateUrl: 'modules/master_data/geographical.html',
            controller: 'geographicalCtrl'
        })

        .when('/admin/services', {
            templateUrl: 'modules/services/dashboard.html',
            controller: 'engineCtrl'
        })
        .when('/admin/services/services-engine', {
            templateUrl: 'modules/services/engine.html',
            controller: 'engineCtrl'
        })
        .when('/admin/services/services-navigation-menu', {
            templateUrl: 'modules/services/navigation.html',
            controller: 'navigationCtrl'
        })
        .when('/admin/services/services-roles-actions', {
            templateUrl: 'modules/services/roles.html',
            controller: 'rolesCtrl'
        })
        .when('/admin/services/services-roles-actions/:serviceId/:roleId/:name', {
            templateUrl: 'modules/services/role_action.html',
            controller: 'roleActionCtrl'
        })

        .when('/admin/actors', {
            templateUrl: 'modules/actors/dashboard.html',
            controller: 'actorManagementCtrl'
        })
        .when('/admin/actors/actor-management', {
            templateUrl: 'modules/actors/management.html',
            controller: 'actorManagementCtrl'
        })
        .when('/admin/actors/actor-roles-management', {
            templateUrl: 'modules/actors/roles.html',
            controller: 'actorRolesCtrl'
        })
        .when('/admin/actors/roles-navigation-management', {
            templateUrl: 'modules/actors/navigation.html',
            controller: 'rolesNavigationCtrl'
        })  

        .otherwise({
            redirectTo: '/admin/home'
        }); 
});