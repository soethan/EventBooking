(function() {
    "use strict";

    angular.module("app")
    .directive("pageFooter", pageFooter);

    function pageFooter() {
        return {
            replace: true,
            scope: {
                year: "@"
            },
            templateUrl: "/common/directives/pageFooter.tpl.html"
        };
    }
}());