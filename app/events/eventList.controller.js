(function () {
    "use strict";
    angular.module("app")
    .controller("eventListController",
        ["$scope", "$state", "eventsService", eventListController]);

    function eventListController($scope, $state, eventsService) {
        $scope.title = "Events List";

        eventsService.getEvents().query(function(data) {
            $scope.getMyEvents();
            $scope.events = data;
        });

        $scope.getMyEvents = function () {
            eventsService.getMyEvents().then(function(response) {
                $scope.registeredEvents = (response.data || []).map(function (evt) { return evt.id; });
            });
        };

        $scope.onDetailsClicked = function(id) {
            $state.go("event-details", { id: id });
        }

        $scope.onRegisterClicked = function(id) {
            eventsService
                .registerEvent(id)
                .then(function (response) {
                    $scope.getMyEvents();
                    alert("Event had been registered successfully!");
                }, function (error) {
                    alert(error);
                });
        }
    }
}());