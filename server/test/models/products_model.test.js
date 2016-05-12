'use strict'

const expect    = require('chai').expect;
const assert    = require('chai').assert;
const Products  = require(__dirname + '/../../models/products_model.js')
const db        = require('../../modules/config.js').db

describe('Products model', function() {

  describe('#addProduct', function () {

    it('should exist', function () {
      expect(Products.addProduct).to.exist;
    })

    it('should resolve to an integer (product id) for a product not already in the database', function() {
      return Products.addProduct('B004QV6YMW')
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
  })

  describe('#findOrCreate', function() {
    let prodId;
    it('should be a function', function() {
      expect(Products.findOrCreate).to.exist
      expect(Products.findOrCreate).to.be.a('function')
    })
    it('should create a product which is not in the database', function() {
      return Products.findOrCreate('B006T3FMIW')
        .then(result => {
          prodId = result
          expect(result).to.be.a('number')
        })
    })
    it('should should retreive the product id for a product already in the database', function() {
      return Products.findOrCreate('B006T3FMIW')
        .then(result => {
          expect(result).to.be.a('number')
          assert(result === prodId, 'retreived the product id from the prior test')
        })
    })
  })
});
