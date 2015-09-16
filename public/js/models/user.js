angular
  .module('swingy')
  .factory('User', User);

User.$inject = ['$resource', 'API'];
function User($resource, API) {
  var url = 'http://localhost:3000/api/auth'

  return $resource(
    url+'/users/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'signin': { 
        url: url + '/signin',
        method: 'POST' 
      }, 
      'signup': {
        url: url + '/signup',
        method: 'POST'
      }
    }
  );
}