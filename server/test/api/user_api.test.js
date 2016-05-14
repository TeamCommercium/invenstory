'use strict'
const expect = require('chai').expect
const api = supertest(require('../../server'));

describe('User API Tests', function() {

  it('errors if not logged in', function(done) {
    api
    .post('/user/me')
    .expect(401, done)
  });

  it('errors if not logged in', function(done) {
    api
    .get('/user/about')
    .expect(401, done)
  });
});
