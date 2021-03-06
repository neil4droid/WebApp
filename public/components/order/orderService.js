'use strict';
angular.module('logiWebMain')
    .factory('orderService', [function() {
        var orderService = {};

        orderService.getOrder = function() {
            return Parse.Cloud.run('GetMyOrderInfo', {
                "OrderDone": false
            }).then(function(results) {
                    return results;
                },
                function(user, error) {
                    return error;
                });
        };
        orderService.assignTrucksToOrder = function (data) {
            return Parse.Cloud.run('AssignTripsToParticularOrder', {
                data
            }).then(function(results) {
                    return results;
                },
                function(user, error) {
                    return error;
                });
        }
        return orderService;
    }])
