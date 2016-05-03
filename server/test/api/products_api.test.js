var supertest = require('supertest')
var expect = require('chai').expect
var should = require('chai').should
var api = supertest(require('../../server'));

describe('Products API Authentication', function() {

  it('errors if not logged in', function(done) {
    api
    .get('/products/list')
    .expect(401, done)
  });

  it('errors if not logged in', function(done) {
    api
    .get('/products/search')
    .expect(401, done)
  });

});
