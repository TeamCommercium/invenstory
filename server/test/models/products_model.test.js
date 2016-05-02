'use strict'

const expect = require('chai').expect;
const assert = require('chai').assert;
const Products = require(__dirname + '/../../models/products_model.js')
const db      = require('../../modules/config.js').db
describe('Products model', function() {

  beforeEach(function(){
    db.seed.run()
  })

  describe('#addProduct', function () {

    it('should exist', function () {
      expect(Products.addProduct).to.exist;
    })

    it('should return an integer (product id)', function(done) {
      Products.addProduct({'amzn_asin': 'B004QV6YMW'})
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

    it('should return an array containing object with id property', function(done) {
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
    it('should change a value', function(done) {
      Products.editProduct({id: 85, amzn_title: 'New Title'})
        .then((result) => {
          console.log('assert result', result)
          assert(78, result)
          done()
        })
    })
  });

  describe('#addProductDetail', function () {
    it('should exist', function () {
      expect(Products.addProductDetail).to.exist;
    });

    it('should return new detail id', function(done) {
      Products.addProductDetail({product_id:85,amzn_price_fbm:23.99, amzn_price_fba:24.99,
        amzn_fetch_date:'2016-01-01 12:00'})
        .then(function(result) {
          expect(result).is.a('number')
          done()
        })
    })
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
