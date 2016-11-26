/**
 * Created by rishi on 11/23/16.
 */

var auto_exchange = angular.module('auto_exchange', ['ngRoute']);

auto_exchange.config(function ($routeProvider) {
    console.log("Inside config");
    $routeProvider
        .when('/',
            {
                templateUrl: '/partials/welcome.html',
                controller: 'welcome'
            })
        .when('/check-cust',
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
        .when('/transactions',
            {
                templateUrl: '/partials/transactions.html',
                controller: 'transactions'
            })
        .otherwise({redirectTo: '/'});
});

auto_exchange.controller('welcome', function ($scope, $http, $window, $rootScope) {
    $scope.current_branch = {};
    $scope.getBranchInfo = function () {
        $http({
            method : "GET",
            url : '/branch-data',
            params: {},
            headers : {'Content-Type': 'application/json'}
        }).success(function(data) {
            if (data.status == 200) {
                console.log(JSON.stringify(data.profile));
                $rootScope.current_branch = data.profile;
                $scope.current_branch = data.profile;
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
                $rootScope.new_customer = false;
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

    $scope.newCustomer = function () {
        $rootScope.new_customer = true;
        $window.location.href = "#/add";
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
    console.log("Customer - "+ JSON.stringify($scope.customer));
    if($rootScope.new_customer){
        $scope.info = true;
        $scope.info_msg = "Please add customer details for transaction";
    }else {
        if(!$scope.customer){

        }else {
            $scope.success = true;
            $scope.success_msg = "Matching customer found";
            $scope.isDisabled = true;
        }
    }

    $scope.addTransaction = function () {
        $scope.vehicle.ssn = $scope.customer.ssn;
        if($scope.vehicle.type == 'buy'){
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
                $scope.error_msg = "No branches found";
                $scope.error = true;
            }
        }).error(function(error) {
            console.log("Error "+ error);
            $scope.error_msg = error;
            $scope.error = true;
        });
    };

    $scope.setSelected = function (branch_id, location) {
        console.log("Selected branch = "+ branch_id);
        if ($scope.lastSelected) {
            $scope.lastSelected.selected = '';
        }
        this.selected = 'row-select';
        $scope.lastSelected = this;
        $scope.actionDisabled = false;
        $rootScope.branch_id = branch_id;
        $scope.location = location;
    };

    $scope.branchInfo = function () {
        $window.location.href = "#/branch-info";
    }

    $scope.useBranch = function () {
        $http({
            method : "POST",
            url : '/api/updateSession',
            params: {branch_id: $rootScope.branch_id, location: $scope.location},
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
        $window.location.href = "#/";
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

auto_exchange.controller('transactions', function ($scope, $http, $window, $rootScope) {
    $scope.searchOptions = [{value: 'vin', name: 'Search by VIN'}, {value: 'date', name: 'Search by date'}];
    $scope.transactions = {};
    $scope.searchBy = '';
    $scope.searchText = '';
    $scope.isVin = true;

    $scope.searchTransaction = function () {
        console.log("Searchby = "+ $scope.searchBy + "   searchtext "+ $scope.searchText);
        if($scope.searchBy == 'vin'){
            if($scope.searchText != ''){
                $http({
                    method: "POST",
                    url: '/api/getTransactionbyVehicleID',
                    params: {vin: $scope.searchText},
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data) {
                    if (data.status == 200 && data.profile.length != 0) {
                        console.log(JSON.stringify(data.profile));

                    } else {
                        $scope.error_msg = "Transaction with VIN not found";
                        $scope.error = true;
                    }
                }).error(function (error) {
                    console.log("Error " + error);
                    $scope.error_msg = error;
                    $scope.error = true;
                });
            }else {
                $scope.error = true;
                $scope.error_msg = "Vehicle identification number cannot be blank";
            }
        }else if($scope.searchBy == 'date'){
            if($scope.searchText != ''){
                $http({
                    method: "POST",
                    url: '/api/getTransactionbyTransactionDate',
                    params: {date: $scope.searchText},
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data) {
                    if (data.status == 200 && data.profile.length != 0) {
                        console.log(JSON.stringify(data.profile));

                    } else {
                        $scope.error_msg = "Transaction with date not found";
                        $scope.error = true;
                    }
                }).error(function (error) {
                    console.log("Error " + error);
                    $scope.error_msg = error;
                    $scope.error = true;
                });
            }else {
                $scope.error = true;
                $scope.error_msg = "Date cannot be blank";
            }
        }
    };

    $scope.onOptionChange = function (searchBy) {
        console.log("Option changed "+ searchBy);
        $scope.searchBy = searchBy;
        $scope.searchText = '';
        if($scope.searchBy == 'vin'){
            console.log("Option changed "+ $scope.searchBy);
            $scope.isVin = true;
        }else{
            $scope.isVin = false;
        }
    };
});