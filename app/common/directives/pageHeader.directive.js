(function() {
    "use strict";

    angular.module("app")
    .directive("pageHeader", ["$state", "$rootScope", pageHeader]);

    function pageHeader($state, $rootScope) {
        return {
            scope: {
                appName: "@",
                currentState: "@",
                userEmail: "@"
            },
            templateUrl: "/common/directives/pageHeader.tpl.html",
            link: function (scope, elem, attrs) {
                scope.onLogoutClicked = function () {
                    $rootScope.userEmail = undefined;
                    $state.go("events");
                };
            }
        };
    }
}());