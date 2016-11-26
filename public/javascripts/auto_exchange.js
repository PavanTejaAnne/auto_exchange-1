/**
 * Created by rishi on 11/23/16.
 */

var auto_exchange = angular.module('auto_exchange', ['ngRoute']);

auto_exchange.config(function ($routeProvider) {
    console.log("Inside config");
    $routeProvider
        .when('/',
            {
                templateUrl: '/partials/check_customer.html',
                controller: 'check_customer'
            })
        .when('/add',
            {
                templateUrl: '/partials/add_transaction.html',
                controller: 'add_transaction'
            })
        .otherwise({redirectTo: '/'});
});

auto_exchange.controller('check_customer', function ($scope, $http, $window, $rootScope) {
    $rootScope.customer = {};
    $scope.error = false;
    $scope.checkCustomer = function () {
        $http({
            method : "POST",
            url : '/api/getCustomerBySsn',
            params: {ssn: $scope.customer.ssn},
            headers : {'Content-Type': 'application/json'}
        }).success(function(data) {
            if (data.status == 200) {
                console.log(JSON.stringify(data.profile));
                $rootScope.customer = data.profile[0];
                $window.location.href = "#/add";
            }else {
                $scope.error_msg = "Error fetching customer info";
                $scope.error = true;
            }
        }).error(function(error) {
            console.log("Error "+ error);
            $scope.error_msg = error;
            $scope.error = true;
        });
    };

});

auto_exchange.controller('add_transaction', function ($scope, $http, $window, $rootScope) {

    $scope.customer = $rootScope.customer;
    $scope.vehicle = {};
    $scope.isDisabled = false;
    $scope.gender = [{value: 'M', name: 'M'}, {value: 'F', name: 'F'}];
    $scope.cars = getCars();
    $scope.years = getYears();
    $scope.error = false;
    $scope.found = false;

    if(!$scope.customer){
        $scope.error = true;
        $scope.error_msg = "No match found. Please add customer details for transaction";
    }else {
        $scope.found = true;
        $scope.isDisabled = true;
    }
    $scope.addTransaction = function () {
        $scope.vehicle.ssn = $scope.customer.ssn;
        if($scope.vehicle.type == 'buy'){
            console.log("Buying it "+ JSON.stringify($scope.vehicle));
            $http({
                method : "POST",
                url : '/api/setTransactionBuy',
                params: $scope.vehicle,
                headers : {'Content-Type': 'application/json'}
            }).success(function(data) {
                if (data.status == 200 && data.profile.length != 0) {
                    console.log(JSON.stringify(data.profile));

                }else {
                    $scope.error_msg = data.message;
                    $scope.error = true;
                }
            }).error(function(error) {
                console.log("Error "+ error);
                $scope.error_msg = error;
                $scope.error = true;
            });
        }else {
            console.log("Selling it "+ JSON.stringify($scope.vehicle));
            $http({
                method : "POST",
                url : '/api/setTransactionSell',
                params: $scope.vehicle,
                headers : {'Content-Type': 'application/json'}
            }).success(function(data) {
                if (data.status == 200 && data.profile.length != 0) {
                    console.log(JSON.stringify(data.profile));

                }else {
                    $scope.error_msg = data.result;
                    $scope.error = true;
                }
            }).error(function(error) {
                console.log("Error "+ error);
                $scope.error_msg = error;
                $scope.error = true;
            });
        }

    };

    $scope.getModels = function (carId) {
        console.log("Select car id "+ carId);
        $scope.vehicle.manufacturer = getCars().manufacturer[carId].name;
        $scope.models = getCars().manufacturer[carId].models;
    }
});