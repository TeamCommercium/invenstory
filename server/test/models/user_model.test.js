var expect = require('chai').expect;

var User = require(__dirname + '/../../models/user_model.js')

describe('User model', function() {
  describe('#getUserFromAmznId', function () {
    it('should exist', function () {
      expect(User.getUserFromAmznId).to.exist;
    });
  });
  describe('#createUser', function () {
    it('should exist', function () {
      expect(User.createUser).to.exist;
    });
  });
  describe('#updateUser', function () {
    it('should exist', function () {
      expect(User.updateUser).to.exist;
    });
  });
  describe('#addAuth', function () {
    it('should exist', function () {
      expect(User.addAuth).to.exist;
    });
  });
});
