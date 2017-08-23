(function () {
    var app = angular.module('CustomersTransactions', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
    app = angular.module('CustomersTransactions', ["ngRoute"]);

    app.controller('HomeController', function ($scope, api, $filter) {
        $scope.Transactions = null;
        $scope.Customers = null;
        $scope.selectedObject = null;
        GetCustomers();
        var _selected;

        $scope.SearchParam = {
            Name: '',
            DateFrom: '',
            DateTo: ''

        }

        $scope.Search = function (SearchParam) {
            if (SearchParam.Name == "" && SearchParam.DateFrom == "" && SearchParam.DateTo == "") {

                GetTransactions();
            } else {
                GetTransactionWithParam(SearchParam.Name, SearchParam.DateFrom, SearchParam.DateTo);
            }
        }
        GetTransactions();

        function GetTransactions() {
            api.GetTransaction().then(function (d) {

                $scope.Transactions = d.data;

                console.log($scope.Transactions);
            }, function () {
                alert("failed");
            });
        }
        function GetTransactionWithParam(name, dtFrom, dtTo) {
            api.GetTransactionWithParam(name, dtFrom, dtTo).then(function (d) {

                $scope.Transactions = d.data;

                console.log($scope.Transactions);
            }, function () {
                alert("failed");
            });
        }

        function GetCustomers() {
            api.GetCustomer().then(function (d) {
                $scope.Customers = d.data;
                $scope.Names = [];
                for (var i = 0; i < $scope.Customers.length; i++) {
                    $scope.Names.push($scope.Customers[i].Name);
                }
            }, function () {
                alert("failed");
            });
        }
        $scope.ngModelOptionsSelected = function (value) {
            if (arguments.length) {
                _selected = value;
            } else {
                return _selected;
            }
        };
        $scope.modelOptions = {
            debounce: {
                default: 500,
                blur: 250
            },
            getterSetter: true
        };
    });

    app.directive("datepicker", function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, elem, attrs, ngModelCtrl) {
                var updateModel = function (dateText) {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(dateText);
                    });
                };
                var options = {
                    dateFormat: "dd/mm/yy",
                    onSelect: function (dateText) {
                        updateModel(dateText);
                    }
                };
                elem.datepicker(options);
            }
        }
    });
})();