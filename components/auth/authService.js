(function() {
  'use strict';

  angular
    .module('statusApp')
    .factory('Auth', AuthService);

  function AuthService($firebaseAuth) {
    var ref = new Firebase("https://fire-status-app.firebaseio.com");

    // The $firebaseAuth is the service responsible for handling the Firebase authentication methods
    // Returning this from our Auth service will allow us to hook into it from our controller
    return $firebaseAuth(ref);
  }

})();