angular
  .module('swingy')
  .controller('eventsController', EventsController);

EventsController.$inject = ['$http']
function EventsController($http){
  var self = this;

  self.all = [];

  self.searching = false;

  var moods = {
    happy: "104,105,103,107,108,111,114,115,106,117", 
    fun: "116.105,110,113,109,118,119",
    serious: "1999,2999,3001",
    geeky: "80,56,67,102,112",
    inspire: "101,112"
  }

  self.filter = function(mood){
    self.searching = true;

    $http({
      url: 'http://localhost:3000/api/events', 
      method: "GET",
      params: { categories: encodeURIComponent(moods[mood]) }
    }).then(function(response) {

      self.all = [];
      angular.forEach(response.data.events, function(value, key) {
        self.all.push(value);
      })

      self.searching = false;
    }, function(response) {
      console.log("error");
    });
  }

  self.search = function(query){
    self.searching = true;

    $http({
      url: 'http://localhost:3000/api/events', 
      method: "GET",
      params: { q: encodeURIComponent(query) }
    }).then(function(response) {

      self.all = [];

      angular.forEach(response.data.events, function(value, key) {
        self.all.push(value);
      })

      self.searching = false;
    }, function(response) {
      console.log("error");
    });

  }

}