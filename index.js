var server = require('./server/routes.js');
var port = process.env.PORT || 8000;


server.listen(port);
console.log('Now listening on local host port:' + port);
