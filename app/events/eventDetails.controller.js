(function () {
    'use strict';

    angular.module('app')
    .controller('eventDetailsController',
        ["$rootScope", "$scope", "$state", "$stateParams", "$window", "eventsService", eventDetailsController]);

    function eventDetailsController($rootScope, $scope, $state, $stateParams, $window, eventsService) {
        $scope.id = $stateParams.id;
         
        $scope.evt = eventsService.getEvents().get({id: $scope.id}, function() {
            console.log("event : " + $scope.evt);
            $scope.title = $scope.evt.name;
            $scope.getMyEvents();
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

        $scope.onBackClicked = function () {
            $window.history.back();
        }
    }
}());