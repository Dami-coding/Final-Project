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
    }


  return $resource(
    url+':id',
    {id: '@id'},
    { 'update':    { method: 'PUT' },
        'save':    { method: 'POST' },
       'query':    { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
       'like' :    { method: 'POST', url: url + 'like'},
    }
  );
}



