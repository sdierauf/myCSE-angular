define([
    "myCSEApp",
    "home/header"
], function(
    myCSEApp,
    Header
    ){
    'use strict';

    return myCSEApp.controller("HeaderController", function($scope, $http, Header) {
        $scope.Header = Header;
        //these headers could easily be gotten from a service -> api
        $scope.headers = [
            {label:"Home", href:"#/home", id:"homeNav", icon:"icon-home", active:false},
            {label: "Undergrad", href:"#/undergrad", id:"undergradNav", icon:"icon-home", active:false},
            {label: "Staff", href:"#/staff", id:"staffNav", icon:"icon-home", active:false},
            {label: "Study Abroad", href:"#/studyabroad", id:"studyNav", icon:"icon-home", active:false},
            {label: "Internships, Post-UW", href:"#/internships", id:"internshipsNav", icon:"icon-home", active:false},
            {label: "Research", href:"#/research", id:"researchNav", icon:"icon-home", active:false},
            {label: "Cloud", href:"#/cloud", id:"cloudNav", icon:"icon-home", active:false}
        ];
        $scope.isActive = function(item){
            //console.log(item.id, Page.firstLevelNavId());
            return item.id === Header.firstLevelNavId() ? "active" : "";
        };

    });

});
