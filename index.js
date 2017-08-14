var mysql = require('./db/config.js')
var port = process.env.PORT || 8000;

mysql.createDatabase()
  .then(function() {
    var server = require('./server/routes.js');
    server.listen(port);
    console.log('Listening on port ', port);
  })
  .catch(console.error);
