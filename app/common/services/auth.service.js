(function () {
    "use strict";

    angular.module("app")
    .factory("authService", ["$http", "$q", authService]);

    function authService ($http, $q) {
        var authSvc = {};

        authSvc.register = function (userInfoData) {
            var deferred = $q.defer();

            $http.post("/api/user/register", userInfoData)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject("Registration failed. Please contact Administrator.");
                });
            
            return deferred.promise;
        };

        authSvc.login = function (loginData) {
            var deferred = $q.defer();

            $http.post("/api/user/login", loginData)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject("Login failed.");
                });
            
            return deferred.promise;
        };

        return authSvc;
    }
}());