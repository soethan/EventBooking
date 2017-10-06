(function () {
    'use strict';

    angular.module('app')
    .controller('loginController', ["$rootScope", "$scope", "$state", "authService", loginController]);

    function loginController($rootScope, $scope, $state, authService) {
        $scope.title = "Login";
        
        $scope.onLoginClicked = function () {
            var userInfo = {
                email: $scope.email,
                password: $scope.password
            }
            authService
                .login(userInfo)
                .then(function (response) {
                    console.log("onLoginClicked");
                    console.log(response.data);
                    $rootScope.userEmail = response.data.email;
                    
                    console.log($rootScope.userEmail);
                    $state.go("events");
                }, function (error) {
                    alert(error);
                });
        }
    }
}());