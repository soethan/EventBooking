(function () {
    'use strict';

    angular.module('app')
    .controller('registerController',
        ["$scope", "$state", "authService", registerController]);

    function registerController($scope, $state, authService) {
        $scope.title = "Register";
                
        $scope.onRegisterClicked = function() {
            var userInfo = {
                email: $scope.email,
                password: $scope.password,
                contactNumber: $scope.contactNumber
            }
            authService
                .register(userInfo)
                .then(function (response) {
                    alert("You have registered successfully!");
                    $state.go("login");

                }, function (error) {
                    alert(error);
                });
        }

        $scope.onLoginClicked = function () {
            $state.go("login");
        }
    }
}());