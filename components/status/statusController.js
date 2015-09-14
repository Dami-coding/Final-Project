(function() {
  'use strict';

  angular
    .module('statusApp')
    .controller('StatusController', StatusController);

  function StatusController($rootScope, Status, md5) {

    var vm = this;  

    vm.addStatus = addStatus;
    vm.deleteStatus = deleteStatus;

    // We want to get Gravatar images for our users and this requires to hash their email addresses
    // Setting "setting vm.md5 = md5." allows us access to Angular MD5 in the template
    vm.md5 = md5;

    // We can get all of our status data as an array simply by making a call to the Status factory service
    // By setting "m.statusData = Status" we then assign that call to a key
    vm.statusData = Status;

    function addStatus() {
      // If a status entry exists, the AngularFire’s $add method pushes the entry to the data store
      if(vm.statusText) {       
        vm.statusData.$add({

          // Add the status data to Firebase

          // The Firebase server’s timestamp is used as it gets the correct time at which an entry is added
          date: Firebase.ServerValue.TIMESTAMP,
          text: vm.statusText,
          user: {
            username: $rootScope.loggedInUserData.username,
            email: $rootScope.loggedInUserData.email
          }
        });
        vm.statusText = '';
      }
    }

    // This function takes in a specific status and uses AngularFire’s $remove to delete it from Firebase
    // At the same time, it automatically updates the view to reflect the removal
    function deleteStatus(status) {
      // Remove the status that was passed in from the views
      vm.statusData.$remove(status);
    }
  }

})();