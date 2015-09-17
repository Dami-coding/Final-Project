angular
  .module('swingy')
  .controller('usersController', UsersController);

UsersController.$inject = ['User','TokenService']
function UsersController(User, TokenService){
  var self = this;

  self.all    = [];
  self.user  = {};

  // Function to display the message back to the User
  function showMessage(res) {
    var token = res.token ? res.token : null;
    
    // Console.log our response from the API
    if(token) { console.log("In userController", res); }
    self.message =  res.message ? res.message : null;
  }

  self.signup = function() {
    User.signup(self.user, showMessage);
  }

  self.signin = function() {
    User.signin(self.user, showMessage);
  }

  self.logout = function() {
    TokenService.removeToken && TokenService.removeToken();
  }

  self.isLoggedIn = function() {
    return TokenService.isLoggedIn ? TokenService.isLoggedIn() : false;
  }

  self.getUsers = function() {
    self.all = User.query();
  }

  // Load agents only if you are logged in!
  // if (self.isLoggedIn()) {
  //   self.getUsers();
  //   self.user = TokenService.parseJwt();
  // }

  return self;

}