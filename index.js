var server = require('./server/routes.js');
var port = 8000;


module.exports = server.listen(port, function () {
  console.log('Listening on port ', port);
});
