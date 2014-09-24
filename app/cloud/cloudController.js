define([
    'myCSEApp',
    'home/header'
], function(
    myCSEApp,
    Header
    ) {

    return myCSEApp.controller('CloudController', function($scope, $http, Header) {
        Header.setFirstLevelNavId('cloudNav');
    });

});