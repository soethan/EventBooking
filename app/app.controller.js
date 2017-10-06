(function () {
    "use strict";

    angular.module('app').controller("appController", ["$rootScope", "$state", "$scope", appController]);

    function appController($rootScope, $state, $scope) {

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState.name;
            console.log("current state: " + toState.name);
        });

        $scope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
            if(error === "before_login"){
                $state.go("login");
            }
        });
    
    }
}());