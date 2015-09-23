angular
  .module('swingy')
  .factory('Event', Event);

Event.$inject = ['$resource', 'API','$scope'];
function Event($resource, API, $scope) {
  var url = 'http://localhost:3000/api/events'
  var hasLiked = false;
  $scope.likeClick = function () {
      if (!hasLiked) {
          hasLiked = true;
          $scope.liked = 'Unlike';
          $scope.likeCount += 1;
      } else {
          hasLiked = false;
          $scope.liked = 'Like';
          $scope.likeCount -= 1;
      }
    };


  return $resource(
    url+':id',
    {id: '@id'}, { 
    'findByName': { method: 'POST', url: url + 'search/name'}
    console.log("hello")
    }
  );
}



