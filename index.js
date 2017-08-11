var server = require('./server/routes.js');
var port = process.env.PORT || 8000;


module.exports = server.listen(port, function () {
  console.log('Listening on port ', port);
});
