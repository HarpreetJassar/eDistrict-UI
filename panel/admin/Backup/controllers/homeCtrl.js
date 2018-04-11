define(['app', 'services/test_service'], function (app) {
    app.controller('HomeCtrl', function ($scope, Notification) {
        $scope.message = Notification.getData(); 
    });
}); 