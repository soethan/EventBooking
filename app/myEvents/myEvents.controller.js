(function () {
    "use strict";
    angular.module("app")
    .controller("myEventsController",
        ["$rootScope", "$scope", "$state", "eventsService", myEventsController]);

    function myEventsController($rootScope, $scope, $state, eventsService) {
        $scope.title = "My Events";

        $scope.getMyEvents = function () {
            eventsService.getMyEvents($rootScope.userEmail).then(function(response) {
                $scope.events = response.data;
            });
        };
        $scope.getMyEvents();

        $scope.onDetailsClicked = function(id) {
            $state.go("event-details", { id: id });
        };

        $scope.onDeregisterClicked = function(id) {
            eventsService
                .deregisterEvent(id, $rootScope.userEmail)
                .then(function (response) {
                    alert("Event had been deregistered successfully!");
                    $scope.getMyEvents();
                }, function (error) {
                    alert(error);
                });
        };
    }
}());
