angular.module('CustomersTransactions', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('CustomersTransactions')
.controller('TransactionMaintenance', function ($scope, $filter, api) {
    $scope.selected = undefined;
    $scope.submitText = "Add";
    $scope.isEditingText = "Edit";
    $scope.submitted = false;
    $scope.message = '';
    $scope.isFormValid = false;
    $scope.isEditing = false;
    $scope.Customers = null;
    $scope.Transactions = null;
    $scope.Transaction = null;
    $scope.EditingTransactionID = null;
    //$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    $scope.Trans = {

        CustomerID: '',
        Transaction: '',
        Status: '',
    }
    GetCustomers();
    GetTransactions();
    var _selected;

    $scope.$watch('f1.$valid', function (newValue) {
        $scope.isFormValid = newValue;
    });


    $scope.SaveData = function (data) {
        if ($scope.submitText == 'Add') {
            $scope.submitted = true;
            $scope.message = '';

            if ($scope.isFormValid) {
                $scope.submitText = 'Please Wait.....';
                $scope.Trans = data;
                //$scope.Trans[0].CustomerID = selectedObject.ID;
                api.InsertTransaction($scope.Trans).then(function (d) {
                    alert(d);
                    if (d == 'Success') {
                        $scope.submitText = 'Add';
                        ClearForm();
                        GetCustomers();
                        GetTransactions();
                        isEditing = false;
                    }
                    else {
                        $scope.submitText = 'Add';
                    }
                });
            }
            else {
                $scope.message = 'Please fill required fields value';
            }

        }

        if ($scope.submitText == 'Save') {
            $scope.submitted = true;
            $scope.message = '';

            if ($scope.isFormValid) {
                $scope.submitText = 'Please Wait.....';
               
                api.UpdateTransaction($scope.EditingTransactionID, $scope.Trans.Transaction, $scope.Trans.Status).then(function (d) {
                    alert(d);
                    if (d == 'Success') {
                        $scope.submitText = 'Save';
                        GetCustomers();
                        isEditing = false;
                    }
                    else {
                        $scope.submitText = 'Save';
                    }
                });
            }
            else {
                $scope.message = 'Please fill required fields value';
            }

        }
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
    function GetTransactions() {
        api.GetTransaction().then(function (d) {
            $scope.Transactions = d.data;
            console.log($scope.Transactions);
        }, function () {
            alert("failed");
        });
    }
    function ClearForm() {
        $scope.Trans = null;
        $scope.f1.$setPristine();//
        $scope.submitted = false;
        $scope.isEditing = false;
    }
    
    //$scope.Edit = function (ID) {

    //    $scope.Trans = $filter("filter")($scope.Transactions, { id: ID });
    //    $scope.Trans = $scope.Trans[0];
    //    $scope.Customers = $filter("filter")($scope.Customers, { ID: $scope.Trans.CustomerID });
    //    $scope.selectedObject = $scope.Customers[0];
    //    if ($scope.isEditingText == "Cancel") {
    //        $scope.isEditing = true;
    //        $scope.EditingTransactionID = null;
    //        $scope.submitText = "Add";
    //        $scope.isEditingText = "Edit";
    //        $scope.selectedObject = null;
    //        $scope.Trans = {};
    //        GetCustomers();
           
    //    }
    //    else {
    //        $scope.EditingTransactionID = ID;
    //        $scope.isEditing = false;
    //        $scope.submitText = "Save";
    //        $scope.isEditingText = "Cancel";
    //    }


    //}

    $scope.Edit = function (ID) {

        $scope.Trans = $filter("filter")($scope.Transactions, { id: ID });
        $scope.Trans = $scope.Trans[0];
        $scope.Customers = $filter("filter")($scope.Customers, { ID: $scope.Trans.CustomerID });
        $scope.selectedObject = $scope.Customers[0];
        if ($scope.isEditingText == "Cancel") {
            $scope.isEditing = true;
            $scope.EditingTransactionID = null;
            $scope.submitText = "Add";
            $scope.isEditingText = "Edit";
            $scope.selectedObject = null;
            $scope.Trans = {};
            GetCustomers();

        }
        else {
            $scope.EditingTransactionID = ID;
            $scope.isEditing = false;
            $scope.submitText = "Save";
            $scope.isEditingText = "Cancel";
        }


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
    $scope.Delete = function (id) {
        api.DeleteTransaction(id).then(function (d) {
            alert(d);
            if (d == 'Success') {
                ClearForm();
                GetCustomers();
                GetTransactions();
            }
        });
    }
});