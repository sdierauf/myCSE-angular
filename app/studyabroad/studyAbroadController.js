define([
    'myCSEApp',
    'home/header'
], function(
    myCSEApp,
    Header
    ) {

    return myCSEApp.controller('StudyAbroadController', function($scope, $http, Header) {
        Header.setFirstLevelNavId('studyNav')
    });

});