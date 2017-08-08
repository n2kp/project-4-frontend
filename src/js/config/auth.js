angular
.module('justo')
.config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;

  $authProvider.github({
    clientId: 'c68d6e6c5ebea060f449',
    url: `${API_URL}/oauth/github`
  });

  $authProvider.facebook({
    clientId: '1588611524543777',
    url: `${API_URL}/oauth/facebook`
  });
}
