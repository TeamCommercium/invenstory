'use strict'

var expect = require('chai').expect;

var Product = require(__dirname + '/../../models/products_model.js')
var Inventory = require(__dirname + '/../../models/inventory_model.js')

describe('Inventory model', function() {
  describe('#addInventory', function () {
    it('should exist', function () {
      expect(Inventory.addInventory).to.exist;
    })

    it('should add inventory for an existing product', function() {
      let tAsin = 'B00UYNAGTI'
      return Product.getProductId(tAsin)
       .then(result =>  {
         let params = {}
         params.product_id = result[0].id
         params.quantity = 2
         params.purchase_date = '2016-05-01 11:12'
         params.purchase_price = '1.95'
         params.seller_sku = 'fakeSKU' + Math.random(0,10)
         //This only works because user seed data is hardcoded, which needs to change.
         params.user_id = 2
         return Inventory.addInventory(params)
          .then(result =>  {
            console.log('inventory test result', result)
            expect(result[0]).to.be.a('number')
          })
       })
    })

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

    it('should ship inventory', function() {

      let tAsin = 'B00UYNAGTI'
      //this only works because user ids are hardcoded in the seed data. they shouldn't be.
      let userId = 2
      return Product.getProductId(tAsin)
        .then(productId =>  {
          Inventory.shipInventory(productId, userId, 2)
            .then(result =>  {
              console.info('shipping test result:', result)
              expect(result).to.be.an('number')
            })
        })
    })
  });

  describe('#getInventory', function () {
    it('should exist', function () {
      expect(Inventory.getInventory).to.exist;
    });
  });
});
