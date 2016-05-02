var supertest = require('supertest')
var expect = require('chai').expect
var should = require('chai').should
var api = supertest('http://localhost:8080');

describe('Products API Authentication', function() {

  it('errors if not logged in', function(done) {
    api
    .get('/products/list')
    .expect(401, done)
  });

});
