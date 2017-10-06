'use strict';

angular.module('app')
.controller('myEventsController', ["$scope", function($scope) {
    $scope.title = "My Events";
    
}]);


(function () {
    "use strict";
    angular.module("app")
    .controller("myEventsController",
        ["$scope", "$state", "eventsService", myEventsController]);

    function myEventsController($scope, $state, eventsService) {
        $scope.title = "My Events";

        $scope.getMyEvents = function () {
            eventsService.getMyEvents().then(function(response) {
                $scope.events = response.data;
            });
        };
        $scope.getMyEvents();

        $scope.onDetailsClicked = function(id) {
            $state.go("event-details", { id: id });
        };

        $scope.onDeregisterClicked = function(id) {
            eventsService
                .deregisterEvent(id)
                .then(function (response) {
                    alert("Event had been deregistered successfully!");
                    $scope.getMyEvents();
                }, function (error) {
                    alert(error);
                });
        };
    }
}());