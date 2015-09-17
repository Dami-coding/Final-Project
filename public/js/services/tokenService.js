angular
  .module('swingy')
  .service('TokenService', TokenService)

TokenService.$inject = ['$window' , 'jwtHelper']
function TokenService($window, jwtHelper) {

  var self = this;

  self.parseJwt = function() {
    var token = self.getToken();
    return jwtHelper.decodeToken(token);
  }

  self.saveToken = function(token) {
    $window.localStorage['swingy-token'] = token;
  }

  self.getToken = function() {
    return $window.localStorage['swingy-token'];
  }

  self.removeToken = function() {
    $window.localStorage.removeItem('swingy-token');
  }

  self.isLoggedIn = function() {
    var token = self.getToken();

    if (token) {
      return true;
    } else {
      return false;
    }
  }

}