define([
    'myCSEApp',
    'home/header'
], function(
    myCSEApp,
    Header
    ) {

    return myCSEApp.controller('InternshipsController', function($scope, $http, Header) {
        Header.setFirstLevelNavId('internshipsNav');
    });

});