//RequireJS Config
require.config({
    paths:{
        jquery:"./stubs/jquery",
        angular:"./stubs/angular",
        aBootstrap:"../components/angular-bootstrap/ui-bootstrap-tpls",
        toastr:"../components/toastr/toastr",
        moment:"../components/moment/moment"
    }
});

//Start App
require([
    'angular',
    'myCSEApp',
    'home/homeController',
    'home/headerController',
    'undergrad/undergradController',
    'internships/internshipsController',
    'research/researchController',
    'staff/staffController',
    'studyabroad/studyAbroadController',
    'cloud/cloudController'
], function (
    angular,
    myCSEApp,
    HomeController,
    HeaderController,
    UndergradController,
    InternshipsController,
    ResearchController,
    StaffController,
    StudyAbroadController,
    CloudController
    ) {

    'use strict';

    myCSEApp.config(['$routeProvider',function($routeProvider){
        console.log("Configuring Routes");
        $routeProvider
            .when('/home',
            {templateUrl:'app/home/home.html',
                controller:'HomeController'})
            .when('/undergrad',
            {templateUrl: 'app/undergrad/undergrad.html',
                controller: 'UndergradController'})
            .when('/cloud',
            {templateUrl: 'app/cloud/cloud.html',
                controller: 'CloudController'})
            .when('/internships',
            {templateUrl: 'app/internships/internships.html',
                controller: 'InternshipsController'})
            .when('/research',
            {templateUrl: 'app/research/research',
                controller: 'ResearchController'})
            .when('/studyabroad',
            {templateUrl: 'app/studyabroad/studyabroad.html',
                controller: 'StudyAbroadController'})
            .when('/staff',
            {templateUrl: 'app/staff/staff.html',
                controller: 'StaffController'})
            .otherwise({redirectTo:"/home"});
    }]);


    angular.bootstrap(document, ['myCSEApp']);
});
