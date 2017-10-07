(function () {
    "use strict";
    angular.module("app")
    .controller("eventListController",
        ["$rootScope", "$scope", "$state", "eventsService", eventListController]);

    function eventListController($rootScope, $scope, $state, eventsService) {
        $scope.title = "Events List";

        eventsService.getEvents().query(function(data) {
            $scope.getMyEvents();
            $scope.events = data;
        });

        $scope.getMyEvents = function () {
            if(!$rootScope.userEmail) {
                $scope.registeredEvents = [];
                return;
            }
            eventsService.getMyEvents($rootScope.userEmail).then(function(response) {
                $scope.registeredEvents = (response.data || []).map(function (evt) { return evt.id; });
            });
        };

        $scope.onDetailsClicked = function(id) {
            $state.go("event-details", { id: id });
        }

        $scope.onRegisterClicked = function(id) {
            eventsService
                .registerEvent(id, $rootScope.userEmail)
                .then(function (response) {
                    $scope.getMyEvents();
                    alert("Event had been registered successfully!");
                }, function (error) {
                    alert(error);
                });
        }
    }
}());