var expect = require('chai').expect;

var User = require(__dirname + '/../../models/user_model.js')

describe('User model', function() {
  describe('#findOrCreateUser', function () {
    it('should exist', function () {
      expect(User.findOrCreateUser).to.exist;
    });
  });
  describe('#updateUser', function () {
    it('should exist', function () {
      expect(User.updateUser).to.exist;
    });
  });
});
