define([
    'myCSEApp',
    'home/header'
], function(
    myCSEApp,
    Header
    ) {

    return myCSEApp.controller('StaffController', function($scope, $http, Header) {
        Header.setFirstLevelNavId('staffNav');
    });

});