var app = angular.module('northwindApp', []);
app.service('nService', function ($http) {
    this.getAllProducts = function () {
        var model = $http
            ({
                method : 'Get',
                url : '/Products/Liste'
            }).then(function (response) {
                return response.data;
            })
        return model;
    }
    this.UpdateProduct = function (p) {
        var productUpdate = $http({
            method: 'POST',
            url: '/Products/Guncel',
            data: p,
        }).then(function (response) {
            return response.data;
            })
        return productUpdate;
    }
    this.getProduct = function (ProductId) {
        var product = $http({
            method :'Get',
            url : '/Products/Detay',
            params: { Id: ProductId }
        }).then(function (response) {
            return response.data;

            })
        return product;
    }
    this.DeleteProduct = function (p) {
        var productDelete = $http({
            method: 'POST',
            url: '/Products/Sil',
            data: p,
        }).then(function (response) {
            return response.data;
            })
        return productDelete;
    }
    this.AddProduct = function (p) {
        var newProduct = $http({
            method: 'POST',
            url: '/Products/Ekle',
            data : p,
        }).then(function (response) {
            return response.data;
            })
        return newProduct;
    }
})
app.controller('nController', function ($scope, nService) {
    $scope.GetProducts = function () {
        nService.getAllProducts().then(function (result) {
            $scope.plist = result.pList;
            $scope.clist = result.cList;
            $scope.slist = result.sList;
        })
    }
    $scope.GetDetails = function (Id) {
        nService.getProduct(Id).then(function (result) {
            $scope.product = result.product;
        })

    }
    $scope.Product = function (p) {
        $scope.p = p;

    }
    $scope.updateProduct = function (p) {
       
        nService.UpdateProduct(p).then(function (result) {
            $scope.msg = result.ProductName + " Güncellendi";
            $scope.GetProducts();
        })

    }
    $scope.deleteProduct = function (p) {
        nService.DeleteProduct(p).then(function (result) {
            $scope.msg = result.ProductName + " Silindi";
            $scope.GetProducts();
             
        })

    }
    $scope.addProduct = function (p) {
        nService.AddProduct(p).then(function (result) {
            $scope.msg = result.ProductName + " Eklendi";
            $scope.GetProducts();

        })

    }
})