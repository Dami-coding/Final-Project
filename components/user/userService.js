(function() {
  'use strict';

  angular
    .module('statusApp')
    .factory('User', UserService);

// Making use of Firebase’s $firebaseObject service to setup a synchronized object
// These are useful for storing key / value pairs and singular records that are not used as a collection
  function UserService($firebaseObject) {

    // This method creates a key at the /users endpoint for the newly registered user
    // The "uid" is a unique Firebase identifier that is guaranteed to be distinct
    // The "uid" is formatted using the provider method and then a number representing the user
    function newUserRef(user) {
      var ref = new Firebase("https://fire-status-app.firebaseio.com/users/" + user.uid);
      // When a new user registers, the object returned on success contains the uid for that user
      // This is what allows us to tap into it in the User service
      return $firebaseObject(ref);
    }

    // This method is responsible for accessing the user data for a specific user at the /users endpoint
    // This gives us an easy way to access user information across the app
    function getUserData(user) {
      var ref = new Firebase("https://fire-status-app.firebaseio.com/users/" + user);
      return $firebaseObject(ref);
    }

    // This method lets us access data that Firebase stores in local storage for the currently logged-in user
    // Since the data is stored as a string, we have to apply JSON.parse to turn it into a useful object
    function getLoggedInUser() {
      var user = localStorage.getItem('firebase:session::fire-status-app');
      if(user) {
        return JSON.parse(user);
      }
    }

    return {
      newUserRef: newUserRef,
      getUserData: getUserData,
      getLoggedInUser: getLoggedInUser
    }

  }

})();