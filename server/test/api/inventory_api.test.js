var supertest = require('supertest')
var expect = require('chai').expect
var api = supertest('http://localhost:8080');

describe('Inventory API Authentication', function() {

  it('errors if not logged in', function(done) {
    api
    .post('/inventory/add')
    .expect(401, done)
  });

  it('errors if not logged in', function(done) {
    api
    .get('/inventory/list')
    .expect(401, done)
  });

  it('errors if not logged in', function(done) {
    api
    .put('/inventory/ship')
    .expect(401, done)
  });

  it('errors if not logged in', function(done) {
    api
    .delete('/inventory/delete')
    .expect(401, done)
  });
});
