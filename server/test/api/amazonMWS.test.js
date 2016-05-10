var expect = require('chai').expect
var should = require('chai').should
var amazonMWS = require('../../api/amazonMWS')


describe('Amazon Merchant Service module', function() {

  describe('#getAmznDetails', function () {

    it('should exist', function () {
      expect(amazonMWS.getAmznDetails).to.exist
        expect(amazonMWS.getAmznDetails).is.a('function')
    })

  })

  describe('#getMatchingProductByAsin', function () {

    it('should exist', function () {
      expect(amazonMWS.getMatchingProductByAsin).to.exist
        expect(amazonMWS.getMatchingProductByAsin).is.a('function')
    })

  })

});
