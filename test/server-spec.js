var request = require('supertest');
// require = require('really-need');
describe('express loading', function () {
  var server;
  beforeEach(function () {
    delete require.cache[require.resolve('../index.js')];
    server = require('../index.js');
  });
  afterEach(function (done) {
    server.close(done);
  });
  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/rofl/copter')
      .expect('404', done);
  });
});
