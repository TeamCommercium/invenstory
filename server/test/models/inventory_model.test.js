var expect = require('chai').expect;

var Inventory = require(__dirname + '/../../models/inventory_model.js')

describe('Inventory model', function() {
  describe('#addInventory', function () {
    it('should exist', function () {
      expect(Inventory.addInventory).to.exist;
    });
  });
  describe('#deleteInventory', function () {
    it('should exist', function () {
      expect(Inventory.deleteInventory).to.exist;
    });
  });
  describe('#shipInventory', function () {
    it('should exist', function () {
      expect(Inventory.shipInventory).to.exist;
    });
  });
  describe('#getInventory', function () {
    it('should exist', function () {
      expect(Inventory.getInventory).to.exist;
    });
  });
});
