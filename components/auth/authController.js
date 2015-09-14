(function() {
  'use strict';

  angular
    .module('statusApp')
    .controller('AuthController', AuthController);

  function AuthController(Auth, User, $state) {
    // These Auth methods were not created by us anywhere
    // They are accessed from the $fireabaseAuth service which is what is returned from the Auth factory

    var vm = this;

    vm.createUser = createUser;
    vm.login = login;
    vm.logout = logout;
    vm.loggedInUser;

    // createUser is responsible for accepting user input and create a new user in Firebase
    function createUser() {

      // If there is already a user logged in,
      // log them out before proceeding
      Auth.$unauth();

      Auth.$createUser({
        email: vm.email,
        password: vm.password
      }).then(function(userData) {
        saveUser(userData);
        vm.login();
      }).catch(function(error) {
        vm.error = error;
      });
    }

    // The saveUser method takes some user data as an argument
    // This user data is the object that Firebase returns when a new user is created
    function saveUser(userData) {

      // The user data is passed to the newUserRef method on the User service
      // The newUserRef then establishes a new user key at the /users endpoint
      var user = User.newUserRef(userData);
      user.username = vm.username;
      user.email = vm.email;

      // The AngularFire’s $save method pushes the established properties as data to Firebase
      // If the save is successful, the user input is cleared and the user is redirected to the status state
      user.$save().then(function(success) {
        vm.username = null;
        vm.email = null;
        vm.password = null;
      }, function(error) {
        console.log("there was an error! " + error);
      });
    }


    function login() {

      // The $authWithPassword method accepts an object with an email and password key
      // These are set to be whatever the user has input for those fields
      Auth.$authWithPassword({
        email: vm.email,
        password: vm.password
      }).then(function(data) {
        // The success handler within "then" lets us clear the user input
        // If the login was successful, the user is also being redirected to the main status page 
        vm.email = null;
        vm.password = null;
        $state.go('status');
      }).catch(function(error) {
        // If the login was unsuccessful, the error is logged into the console
        console.log(error);
      });
    }

    function logout() {
      Auth.$unauth();
      $state.go('status');
      location.reload();
      // $state.transitionTo('status', $state.$current.params, { reload: true, inherit: true, notify: true });
      // $state.go('status', {}, { reload: true, inherit: true, notify: true });
      console.log("User Logged Out");
    }
  }

})();