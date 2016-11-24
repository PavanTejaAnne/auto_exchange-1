/**
 * Created by rishi on 11/23/16.
 */

var auto_exchange = angular.module('auto_exchange', ['ngRoute']);

auto_exchange.config(function ($routeProvider) {
    console.log("Inside config");
    $routeProvider
        .when('/',
            {
                templateUrl: '/partials/add_transaction.html',
                controller: 'Home'
            })
        .otherwise({redirectTo: '/'});
});

auto_exchange.controller('Home', function ($scope, $http, $window, $rootScope) {

});