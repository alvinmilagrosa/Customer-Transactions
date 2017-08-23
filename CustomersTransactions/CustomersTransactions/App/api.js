angular.module('CustomersTransactions').
factory('api', function ($http, $q) {
    var fac = {};
    fac.InsertCustomer = function (data) {
        var defer = $q.defer();
        $http({
            url: '/Data/InsertCustomer',
            method: 'POST',
            data: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        }).success(function (d) {
            defer.resolve(d);
        }).error(function (e) {
            alert('error');
            defer.reject(e);
        });
        return defer.promise;
    }
    fac.UpdateCustomer = function (data) {
        var defer = $q.defer();
        $http({
            url: '/Data/UpdateCustomer',
            method: 'POST',
            data: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        }).success(function (d) {
            defer.resolve(d);
        }).error(function (e) {
            alert('error');
            defer.reject(e);
        });
        return defer.promise;
    }
    fac.DeleteCustomer = function (id) {
        var defer = $q.defer();
        $http.post("/Data/DeleteCustomer", { ID: id })
        .success(function (d) {
            defer.resolve(d);
        }).error(function (e) {
            alert('error');
            defer.reject(e);
        });
        return defer.promise;
    }
    fac.GetCustomer = function () {
        return $http.get('/Data/GetCustomer');
    }
    fac.GetTransactionWithParam = function (name, dtFrom, dtTo) {
        return $http.post('/Data/GetTransactionWithParam', { Name:  name , DtFrom:dtFrom,DtTo: dtTo});
    }
    fac.GetTransaction = function () {
        return $http.get('/Data/GetTransaction');
    }
    fac.InsertTransaction = function (data) {
        var defer = $q.defer();
        $http({
            url: '/Data/InsertTransaction',
            method: 'POST',
            data: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        }).success(function (d) {
            defer.resolve(d);
        }).error(function (e) {
            alert('error');
            defer.reject(e);
        });
        return defer.promise;
    }
    fac.UpdateTransaction = function (id,transaction,status) {
        var defer = $q.defer();
        $http.post("/Data/UpdateTransaction", { ID: id, Transaction: transaction, Status: status })
        .success(function (d) {
            defer.resolve(d);
        }).error(function (e) {
            alert('error');
            defer.reject(e);
        });
        return defer.promise;
    }

    fac.DeleteTransaction = function (id) {
        var defer = $q.defer();
        $http.post("/Data/DeleteTransaction", { ID: id })
        .success(function (d) {
            defer.resolve(d);
         
        }).error(function (e) {
            defer.reject(e);
            alert('error');
        });
        return defer.promise;
    }
    return fac;
});