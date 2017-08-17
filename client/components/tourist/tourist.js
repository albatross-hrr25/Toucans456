angular.module('app')

  .controller('TouristCtrl', ['$scope', 'get', '$state', function ($scope, get, $state) {

    this.loginClick = (username, password) => {
      var config = {
        params: { username: username, hash: password }
      }
      get.login(config, (token) => {
        console.log('TOKEN:',token);
        //SET THE USERNAME ON THE APP MODULE SCOPE.
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.data;
        // Get User's Personal Hompage
        get.getHomepage(null, null);
        // route to primary view
        //on sucess:
        $state.go('primary');
      });
    }
  }])

  .component('tourist', {
    controller: 'TouristCtrl',
    templateUrl: 'client/components/tourist/tourist.html'

  });