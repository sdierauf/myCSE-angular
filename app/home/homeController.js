define([
    "myCSEApp",
    "home/header"
], function(
    myCSEApp
    ){
    'use strict';

    return myCSEApp.controller("HomeController", function($scope, $http, Header) {
        Header.setFirstLevelNavId('homeNav');
    });

});
