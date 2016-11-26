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
        .when('/branch',
            {
                templateUrl: '/partials/branch.html',
                controller: 'branch'
            })
        .when('/branch-info',
            {
                templateUrl: '/partials/branch_info.html',
                controller: 'branch_info'
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
    $scope.success = false;
    $scope.info = false;

    if(!$scope.customer){
        $scope.info = true;
        $scope.info_msg = "No match found. Please add customer details for transaction";
    }else {
        $scope.success = true;
        $scope.success_msg = "Matching customer found";
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
                    $scope.error_msg = data.message;
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


auto_exchange.controller('branch', function ($scope, $http, $window, $rootScope) {
    $scope.branches = {};
    $scope.lastSelected = '';
    $scope.actionDisabled = true;

    if($rootScope.branch_update){
        $scope.info = true;
        $scope.info_msg = "Company branch updated";
    }else if($rootScope.branch_add){
        $scope.info = true;
        $scope.info_msg = "Company branch added";
    }

    $scope.getAllBranches = function () {
        $http({
            method : "POST",
            url : '/api/getAllBranches',
            params: {},
            headers : {'Content-Type': 'application/json'}
        }).success(function(data) {
            if (data.status == 200 && data.profile.length != 0) {
                console.log(JSON.stringify(data.profile));
                $scope.branches = data.profile;
            }else {
                $scope.error_msg = data.result;
                $scope.error = true;
            }
        }).error(function(error) {
            console.log("Error "+ error);
            $scope.error_msg = error;
            $scope.error = true;
        });
    };

    $scope.setSelected = function (branch_id) {
        console.log("Selected branch = "+ branch_id);
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = '';
        }
        this.selected = 'row-select';
        $scope.lastSelected = this;
        $scope.actionDisabled = false;
        $rootScope.branch_id = branch_id;
    };

    $scope.branchInfo = function () {
        $window.location.href = "#/branch-info";
    }
});

auto_exchange.controller('branch_info', function ($scope, $http, $window, $rootScope) {

    var branch_id = $rootScope.branch_id;
    console.log("Branch id "+ branch_id);
    $scope.branch = {};
    $scope.message = "Add new branch information";
    $scope.buttonText = "Add";
    $rootScope.branch_update = false;
    $rootScope.branch_add = false;

    if(branch_id) {
        $scope.message = "Update branch information for branch number "+ branch_id;
        $scope.buttonText = "Update";
        $http({
            method: "POST",
            url: '/api/getBranchById',
            params: {branch_id: branch_id},
            headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
            if (data.status == 200 && data.profile.length != 0) {
                console.log(JSON.stringify(data.profile));
                $scope.branch = data.profile[0];
            } else {
                $scope.error_msg = data.result;
                $scope.error = true;
            }
        }).error(function (error) {
            console.log("Error " + error);
            $scope.error_msg = error;
            $scope.error = true;
        });
    }

    $scope.branchInfo = function () {
        if($scope.buttonText == 'Add'){
            $http({
                method: "POST",
                url: '/api/addNewBranch',
                params: $scope.branch,
                headers: {'Content-Type': 'application/json'}
            }).success(function (data) {
                if (data.status == 200 && data.profile.length != 0) {
                    console.log(JSON.stringify(data.profile));
                    $rootScope.branch_update = false;
                    $window.location.href = "#/branch";
                } else {
                    $scope.error_msg = data.result;
                    $scope.error = true;
                }
            }).error(function (error) {
                console.log("Error " + error);
                $scope.error_msg = error;
                $scope.error = true;
            });
        }else {
            $http({
                method: "POST",
                url: '/api/updateBranchInfo',
                params: $scope.branch,
                headers: {'Content-Type': 'application/json'}
            }).success(function (data) {
                if (data.status == 200 && data.profile.length != 0) {
                    console.log(JSON.stringify(data.profile));
                    $rootScope.branch_add = true;
                    $window.location.href = "#/branch";
                } else {
                    $scope.error_msg = data.result;
                    $scope.error = true;
                }
            }).error(function (error) {
                console.log("Error " + error);
                $scope.error_msg = error;
                $scope.error = true;
            });
        }

    };
});