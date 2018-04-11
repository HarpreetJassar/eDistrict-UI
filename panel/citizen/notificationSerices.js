/**
 * Created by gobind on 19/06/17.
 */
angular.module('notificationServices', [])

    .factory('Notification', function () {

        notificationFactory = {};

        notificationFactory.error = function (title, msg) {
            swal({
                title: title,
                text: msg,
                type: "error",
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: "Close"
            });
        };

        notificationFactory.info = function (title, msg) {
            swal({
                title: title,
                text: msg,
                type: "info",
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: "Close"
            });
        };

        notificationFactory.success = function (title, msg) {
            swal({
                title: title,
                text: msg,
                type: "success",
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: "Close"
            });
        };

        return notificationFactory;
    });
