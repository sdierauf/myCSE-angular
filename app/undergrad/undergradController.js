define([
    'myCSEApp',
    'home/header'
], function(
    myCSEApp,
    Header
    ) {
    'use strict';

    return myCSEApp.controller('UndergradController', function($scope, $http, Header) {
       Header.setFirstLevelNavId('undergradNav');
    });


})