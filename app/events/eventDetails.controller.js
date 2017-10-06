(function () {
    'use strict';

    angular.module('app')
    .controller('eventDetailsController',
        ["$scope", "$state", "$stateParams", "$window", "eventsService", eventDetailsController]);

    function eventDetailsController($scope, $state, $stateParams, $window, eventsService) {
        $scope.id = $stateParams.id;
         
        $scope.evt = eventsService.getEvents().get({id: $scope.id}, function() {
            console.log("event : " + $scope.evt);
            $scope.title = $scope.evt.name;
            $scope.getMyEvents();
        });

        $scope.getMyEvents = function () {
            eventsService.getMyEvents().then(function(response) {
                $scope.registeredEvents = (response.data || []).map(function (evt) { return evt.id; });
            });
        };

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

        $scope.onBackClicked = function () {
            $window.history.back();
        }
    }
}());