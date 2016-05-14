'use strict'

const expect = require('chai').expect;
const assert = require('chai').assert;
const rewire = require('rewire');
const APS = rewire(__dirname + '/../../modules/amznPriceService.js')
const Product = rewire(__dirname + '/../../models/products_model.js')

describe('Amazon Price Service module', function() {

  describe('#init', function () {

    it('should exist', function () {
      expect(APS.init).to.exist
        expect(APS.init).is.a('function')
    })
  })

  describe('#preBatch', function(){

    let preBatch = APS.__get__('preBatch')
    it('should exist', function() {
      expect(preBatch).to.exist
      expect(preBatch).is.a('function')
    })

    it('should return an array', function() {
      return preBatch()
        .then(function(result){
          expect(result).is.an('array')
        })
    })

  })

  describe('#batch', function() {

    let Batch = APS.__get__('Batch');

    it('should exist', function() {
      expect(Batch).to.exist
      expect(Batch).is.a('function')
    })

    it('should prepare a batch', function() {

      return Promise.all([
        Product.getProductId('B00UYNAGTI'),
        Product.getProductId('B0050R0YB8')
      ])
      .then(function(results){
        console.log('Retreive ASINs for batch testing:', results)
        let first = {id:results[0][0].id, amzn_asin:'B00UYNAGTI'}
        let second = {id:results[1][0].id, amzn_asin: 'B0050R0YB8'}
        let details = [first,second]
        let aBatch = new Batch(details)

        let asins = aBatch.asins()

        assert(asins[0] === 'B00UYNAGTI', 'first element of asins array is first asin')
        assert(asins[1] === 'B0050R0YB8', 'first element of asins array is first asin')
      })

    })
  })
});
