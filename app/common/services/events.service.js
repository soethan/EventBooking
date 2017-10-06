(function () {
    "use strict";

    angular.module("app")
    .factory("eventsService", ["$http", "$resource", "$q", eventsService]);

    function eventsService ($http, $resource, $q) {
        var evtSvc = {};

        evtSvc.getEvents = function() {
            return $resource("/api/events/:id");
        };

        evtSvc.registerEvent = function (eventId) {
            var deferred = $q.defer();
            $http.post("/api/events/register", {id: eventId})
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject("Event registration failed. Please contact Administrator.");
                });
            
            return deferred.promise;
        };

        evtSvc.deregisterEvent = function (eventId) {
            var deferred = $q.defer();
            $http.post("/api/events/deregister", {id: eventId})
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject("Event deregistration failed. Please contact Administrator.");
                });
            
            return deferred.promise;
        };

        evtSvc.getMyEvents = function () {
            var deferred = $q.defer();
            $http.get("/api/events/myevents")
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject("Getting my registered events failed. Please contact Administrator.");
                });
            
            return deferred.promise;
        };
        
        return evtSvc;
    }
}());