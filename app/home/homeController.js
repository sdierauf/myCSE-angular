define([
    "myCSEApp",
    "services/usersService",
    "home/header"
], function(
    myCSEApp,
    theUsersService
    ){
    'use strict';

    return myCSEApp.controller("HomeController", function($scope, $http, Header, UsersService) {
        Header.setFirstLevelNavId('homeNav');

        $scope.user = {};

        $scope.loadUser = function loadUser(id) {
            UsersService.getById(1232328)
              .then(function (response) {
                  console.log(response);
                  $scope.user = response;
              });
        }

        $scope.loadUser(10);
    });

});
