angular.module('app')
  .controller('TouristCtrl', function ($scope, get, $state, $timeout, store) {
    this.showSignUp = () => {
      $("#signUpModal").modal('show');
    };

    this.loginAfterClick= () => {
      var username = angular.element(document.getElementById("username"))[0].value;
      var password = angular.element(document.getElementById("pwd"))[0].value;
      var config = {
        params: { username: username, hash: password }
      };

      get.login(config,
        (token) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.data;
        //save token to local storage
        store.set('id_token', token);
        // Get User's Personal Hompage route to primary view
        $state.go('primary');
        },
        () => {
          $("#logInFailedModal").modal('show')
        }
      );
    };

    this.loginClick = () => {
      $("#signUpModal").modal('hide');
      $timeout(() => this.loginAfterClick(), 200);
    };


    this.signAfterClick = () => {
      var username = angular.element(document.getElementById("signupUserId"))[0].value;
      var password = angular.element(document.getElementById("signupUserPwd"))[0].value;

      var config = {username: username, hash: password};

      var config = {username: username, hash: password};

      get.signUp (config, (token) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.data;
        // Get User's Personal Hompage route to primary view
        $state.go('primary');
      },
        () => {
          $("#signUpFailedModal").modal('show')
      });

    };

    this.signUpClick = (username, password) => {
      $("#signUpModal").modal('hide');
      $timeout(() => this.signAfterClick(), 200);

    };
  })
  .component('tourist', {

    controller: 'TouristCtrl',
    templateUrl: 'templates/tourist.html'

  });
