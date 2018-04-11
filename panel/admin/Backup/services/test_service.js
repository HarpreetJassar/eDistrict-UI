define(['app'], function (app) {
    app.factory('Notification', function() {

        notificationFactory = {};

        notificationFactory.getData = function() {
            return "DATA";
        };

        return notificationFactory;
    });
}); 