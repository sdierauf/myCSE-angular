define([
    'myCSEApp',
    'home/header'
], function(
    myCSEApp,
    Header
    ) {

    return myCSEApp.controller('ResearchController', function($scope, $http, Header) {
        Header.setFirstLevelNavId('researchNav');
    });

});