(function() {
  'use strict';

  angular
  .module('statusApp', ['firebase', 'ngMaterial', 'angular-md5', 'ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    // Setting up the rules for UI Router to handle different states

    // If a route other than status is requested go to the auth route
    $urlRouterProvider.otherwise('/auth');

    $stateProvider
    .state('auth', {
      url: '/auth',
      templateUrl: 'components/auth/authView.html',
      // Setting controller and giving it a name for the auth page
      controller: 'AuthController as auth'
    })
    .state('status', {
      url: '/status',
      templateUrl: 'components/status/statusView.html',
      // Setting controller and giving it a name for the status page
      controller: 'StatusController as status'
    });
  })

  // Listening for changes to the app’s state and using the User service to get the currently logged-in user
  // Using data that Firebase keeps in local storage for the user with the specified key
  // If data exists, call the getUserData method on the User service and pass in the uid
  // The Data returned is placed on the loggedInUserData property of $rootScope, which can be accessed across the app
  .run(function($rootScope, $state, User) {

    // Listen for changes to the state and run the code in the callback when the change happens
    $rootScope.$on('$stateChangeStart', function() {

      // Use the User factory service to get the currently logged-in user from local storage
      var loggedInUser = User.getLoggedInUser();

      // Check that a logged-in user is actually saved in local storage
      if(loggedInUser) {

        // Use getUserData method on the User service to grab data from the /users endpoint in Firebase for the logged-in user
        $rootScope.loggedInUserData = User.getUserData(loggedInUser.uid);
      }
    });
  });

})();