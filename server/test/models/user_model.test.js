'use strict'
const expect = require('chai').expect
const User = require(__dirname + '/../../models/user_model')

describe('User model', function() {

  describe('#findOrCreateUser', function () {

    it('should exist', function () {
      expect(User.findOrCreateUser).to.exist
    });

    it('should should return an array with id for a new user', function () {
      return User.findOrCreateUser({amazon_id:'fakeamznprofile'})
        .then(function(result) {
          expect(result.id).is.an('number')
        })
    });

    it('should should return an array with id for an existing user', function () {
      return User.findOrCreateUser({amazon_id:'seedamzn1'})
        .then(function(result) {
          expect(result.id).is.an('number')
        })
    });

  });

});
