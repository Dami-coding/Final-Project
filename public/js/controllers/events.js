angular
  .module('swingy')
  .controller('eventsController', EventsController);

EventsController.$inject = ['$http']
function EventsController($http){
  var self = this;

  self.all = [];

  self.searching = false;

  var moods = {
    happy: "103,105,106,107,108,114,115", 
    fun: "105,109,110,111,116,113,118,119",
    serious: "101,112",
    geeky: "102,104",
    inspire: "113,117,199"
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




