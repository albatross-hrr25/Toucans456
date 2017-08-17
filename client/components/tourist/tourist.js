angular.module('app')
  .controller('TouristCtrl', function($scope, get) {
    this.loginClick = (username, password) => {
      var config = {
        params: { username: username, hash: password }
      }
      get.login(config, (token) => {
        console.log('TOKEN:',token);
        //SET THE USERNAME ON THE APP MODULE SCOPE.
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.data;
      });
    }
  })
  .component('tourist', {
    controller: 'TouristCtrl',
    templateUrl: 'client/components/tourist/tourist.html'

  });