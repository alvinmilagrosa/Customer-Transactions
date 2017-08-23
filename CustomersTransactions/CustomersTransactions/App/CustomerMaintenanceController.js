angular.module('CustomersTransactions')
.controller('CustomersMaintenance', function ($scope, $filter,api) {
    $scope.submitText = "Add";
    $scope.isEditingText = "Edit";
    $scope.submitted = false;
    $scope.message = '';
    $scope.isFormValid = false;
    $scope.isEditing = false;
    $scope.Customers = null;
    GetCustomers();
    $scope.Customer = {
        Name: '',
        Address: '',
        Email: '',
        Age: '',
        Sex: ''
    }
    $scope.$watch('f1.$valid', function (newValue) {
        $scope.isFormValid = newValue;
    });

    $scope.SaveData = function (data) {
        if ($scope.submitText == 'Add') {
            $scope.submitted = true;
            $scope.message = '';

            if ($scope.isFormValid) {
                $scope.submitText = 'Please Wait.....';
                $scope.User = data;
                api.InsertCustomer($scope.Customer).then(function (d) {
                    alert(d);
                    if (d == 'Success') {
                        ClearForm();
                        GetCustomers();
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
                $scope.User = data;
                api.UpdateCustomer($scope.Customer).then(function (d) {
                    alert(d);
                    if (d == 'Success') {
                        $scope.submitText = 'Save';
                        ClearForm();
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
    $scope.Edit = function (id) {

        $scope.Customer = $filter("filter")($scope.Customers, { ID: id });
        $scope.Customer = $scope.Customer[0];
        if ($scope.isEditingText == "Cancel") {
            $scope.isEditing = true;
            $scope.submitText = "Add";
            $scope.isEditingText = "Edit";
            $scope.Customer = {};
        }
        else {
            $scope.isEditing = false;
            $scope.submitText = "Save";
            $scope.isEditingText = "Cancel";
        }


    }
    $scope.Delete = function (id)
    {
        api.DeleteCustomer(id).then(function (d) {
            alert(d);
            if (d == 'Success') {
                ClearForm();
                GetCustomers();
            }
        });
    }
    function ClearForm() {
        $scope.User = null;
        $scope.f1.$setPristine();//
        $scope.submitted = false;
    }
    function GetCustomers() {
        api.GetCustomer().then(function (d) {
            $scope.Customers = d.data;
            console.log($scope.Customers);
        }, function () {
            alert("Failed");
        }); 
    }
})