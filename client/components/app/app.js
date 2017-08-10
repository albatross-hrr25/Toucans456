angular.module('app', [])

.component('app', {
  controller: 'ChangeLater',
  templateUrl: '/components/app/app.html',
})

.controller ('ChangeLater', function () {

  console.log('ChangeLater is running: this is ', this);
})
