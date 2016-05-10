var expect = require('chai').expect;

var APS = require(__dirname + '/../../modules/amznPriceService.js')

describe('Amazon Price Service modules', function() {

  describe('#init', function () {

    it('should exist', function () {
      expect(APS.init).to.exist
        expect(APS.init).is.a('function')
    })

  })

});
