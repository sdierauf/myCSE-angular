define([
  'myCSEApp'
], function(
  myCSEApp
) {

  return myCSEApp
    .service('UsersService', function($http) {

    this.getById = function getById(id) {
      return $http.get('http://localhost:3000/users/' + id)
        .then(function(response) {
          return response.data;
        });
    };

  });

});