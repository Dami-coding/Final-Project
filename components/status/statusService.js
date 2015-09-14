(function() {
  'use strict';

  angular
    .module('statusApp')
    .factory('Status', StatusService);

  // The $firebaseArray is the AngularFire service wrapper used to setup a synchronized collection
  // Synchronized arrays are used for lists of objects that are sorted, iterated and which have unique IDs
  // The array is sorted in the same order as the records on the server
  function StatusService($firebaseArray) {
    var ref = new Firebase("https://fire-status-app.firebaseio.com/status");
    return $firebaseArray(ref);
  }

})();