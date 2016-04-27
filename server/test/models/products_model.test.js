var expect = require('chai').expect;

var Products = require(__dirname + '/../../models/products_model.js')

describe('Products model', function() {
  describe('#addProduct', function () {
    it('should exist', function () {
      expect(Products.addProduct).to.exist;
    });
  });
  describe('#getProductId', function () {
    it('should exist', function () {
      expect(Products.getProductId).to.exist;
    });
  });
  describe('#editProduct', function () {
    it('should exist', function () {
      expect(Products.editProduct).to.exist;
    });
  });
  describe('#addProductDetail', function () {
    it('should exist', function () {
      expect(Products.addProductDetail).to.exist;
    });
  });
});
