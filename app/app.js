'use strict';

angular.module('app', [
  'ui.router',
  'ngResource',
  'ngMockE2E',
  'ngStorage'
])
.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
  function($locationProvider, $stateProvider, $urlRouterProvider) {
    
    $locationProvider.hashPrefix('!');

    $stateProvider
      .state('login', {
        url: "/login",
        controller: 'loginController',
        templateUrl: '/login/login.tpl.html',
      })
      .state('register', {
        url: "/register",
        controller: 'registerController',
        templateUrl: '/register/register.tpl.html',
      })
      .state('events', {
        url: "/events",
        controller: 'eventListController',
        templateUrl: '/events/eventList.tpl.html',
      })
      .state('event-details', {
        url: "/events/:id",
        controller: 'eventDetailsController',
        templateUrl: '/events/eventDetails.tpl.html',
      })
      .state('myEvents', {
        url: "/myevents",
        controller: 'myEventsController',
        templateUrl: '/myEvents/myEvents.tpl.html',
        resolve: {
           security: ['$q', '$rootScope', function($q, $rootScope) {
               if(!$rootScope.userEmail){
                  return $q.reject("before_login");
               }
           }]
        }
      });
      $urlRouterProvider.otherwise("/events");
}])
.run(function($rootScope, $httpBackend) {
  $rootScope.appName = "Event Booking";
});