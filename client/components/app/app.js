angular.module('app', [])

.component('app', {
  controller: 'ChangeLater',
  templateUrl: 'client/components/app/app.html',
})

.controller ('ChangeLater', function () {

  console.log('ChangeLater is running: this is ', this);
})
