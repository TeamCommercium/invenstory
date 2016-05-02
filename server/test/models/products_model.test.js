'use strict'

const expect = require('chai').expect;
const assert = require('chai').assert;
const Products = require(__dirname + '/../../models/products_model.js')

describe('Products model', function() {

  describe('#addProduct', function () {

    it('should exist', function () {
      expect(Products.addProduct).to.exist;
    })

    it('should return an integer (product id)', function(done) {
      Products.addProduct({'amzn_asin': 'testasin'})
        .then(function(result) {
          expect(result).to.be.a('number')
          done()
        })
    })
  });

  describe('#getProductId', function () {

    it('should exist', function () {
      expect(Products.getProductId).to.exist;
    });

    it('should return an array containing object with id', function(done) {
      Products.getProductId('B00UYNAGTI')
        .then(function(result) {
          expect(result[0]).to.be.an('object')
          assert(85, result[0].id)
          done()
        })
    })
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

  describe('#getProducts', function () {
    it('should be a function', function () {
      expect(Products.getProducts).to.exist
      expect(Products.getProducts).to.be.a('function')
    })
    it('should resolve to an array', function(done) {
      let uid = 2;
      expect(Products.getProducts(uid)
        .then(function(result){
          expect(result).to.be.an('array')
          done()
        })
      )
    })
  });
});
