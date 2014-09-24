define([
    "myCSEApp"
], function(
    myCSEApp
    ){
    'use strict';

    return myCSEApp.factory('Header', function(){
        var firstLevelNavId = "";
        return {
            firstLevelNavId:function(){return firstLevelNavId;},
            setFirstLevelNavId:function(id){firstLevelNavId = id;}
        }
    })
});