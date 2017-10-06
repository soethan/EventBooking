'use strict';

describe('registerController', function() {
  var $controller;
  var $scope;		
  var $state;
  var authService;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _$state_, _authService_) {
		$controller = _$controller_;
		$scope = {};		
		$state = _$state_;
		authService = _authService_;
	}));

  it('should be defined', function() {

      var registerController = $controller('registerController', {
        $scope: $scope,
        $state: $state,
        authService: authService
      });
      expect(registerController).toBeDefined();
    });
});