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
  
    }
  );
}



function changeBG()
{
    var body = document.getElementsById("swingy")[0];
    body.img.backgroundImage = "swingy_face_blink";
    setTimeout("changeBG",3000); // Change every 30 seconds
}

window.onload = changeBG;