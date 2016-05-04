'use strict'

const expect    = require('chai').expect;
const assert    = require('chai').assert;
const Products  = require(__dirname + '/../../models/products_model.js')
const db        = require('../../modules/config.js').db

describe('Products model', function() {

  beforeEach(function(){
    db.seed.run()
  })

  describe('#addProduct', function () {

    it('should exist', function () {
      expect(Products.addProduct).to.exist;
    })

    it('should return an integer (product id)', function() {
      return Products.addProduct({'amzn_asin': 'B004QV6YMW'})
        .then(function(result) {
          expect(result).to.be.a('number')
        })
    })
  });

  describe('#getProductId', function () {

    it('should exist', function () {
      expect(Products.getProductId).to.exist;
    });

    it('should return an array containing object with id property', function() {
      return Products.getProductId('B00UYNAGTI')
        .then(function(result) {
          expect(result[0]).to.be.an('object')
        })
    })
  });

  describe('#editProduct', function () {
    it('should exist', function () {
      expect(Products.editProduct).to.exist;
    });
    xit('should change a value', function() {
      return Products.editProduct({id: 3, amzn_title: 'New Title'})
        .then((result) => {
          assert(1 === result, 'one record edited')
        })
    })
  });

  describe('#addProductDetail', function () {
    it('should exist', function () {
      expect(Products.addProductDetail).to.exist;
    });

    xit('should return new detail id', function() {
      return Products.addProductDetail({product_id:3,amzn_price_fbm:23.99, amzn_price_fba:24.99,
        amzn_fetch_date:'2016-01-01 12:00'})
        .then(function(result) {
          expect(result).is.a('number')
        })
    })
  });

  describe('#getProducts', function () {
    it('should be a function', function () {
      expect(Products.getProducts).to.exist
      expect(Products.getProducts).to.be.a('function')
    })
    it('should resolve to an array', function() {
      let uid = 2;
      return Products.getProducts(uid)
        .then(function(result){
          expect(result).to.be.an('array')
        })
    })
  });
});
