angular
.module('justo')
.config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;


  $authProvider.github({
    clientId: '44079c6998fea867556d',
    url: `${API_URL}/oauth/github`
  });

  $authProvider.facebook({
    clientId: '1177324765706974',
    url: `${API_URL}/oauth/facebook`
  });
}
