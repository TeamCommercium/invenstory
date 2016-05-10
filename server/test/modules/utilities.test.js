var expect = require('chai').expect;

var Util = require(__dirname + '/../../modules/utilities.js')

describe('Utilities module', function() {

  describe('#cleanMatchingAsins', function () {

    it('should exist', function () {
      expect(Util.cleanMatchingAsins).to.exist
        expect(Util.cleanMatchingAsins).is.a('function')
    })

  })

  describe('#cleanAmznDetails', function () {

    it('should exist', function () {
      expect(Util.cleanAmznDetails).to.exist
        expect(Util.cleanAmznDetails).is.a('function')
    })

    it('should clean a complete response', function() {
      let unclean = JSON.parse('{"GetLowestOfferListingsForASINResponse":{"$":{"xmlns":"http://mws.amazonservices.com/schema/Products/2011-10-01"},"GetLowestOfferListingsForASINResult":[{"$":{"ASIN":"B00H1I639Q","status":"Success"},"AllOfferListingsConsidered":["true"],"Product":[{"$":{"xmlns":"http://mws.amazonservices.com/schema/Products/2011-10-01","xmlns:ns2":"http://mws.amazonservices.com/schema/Products/2011-10-01/default.xsd"},"Identifiers":[{"MarketplaceASIN":[{"MarketplaceId":["ATVPDKIKX0DER"],"ASIN":["B00H1I639Q"]}]}],"LowestOfferListings":[{"LowestOfferListing":[{"Qualifiers":[{"ItemCondition":["New"],"ItemSubcondition":["New"],"FulfillmentChannel":["Merchant"],"ShipsDomestically":["True"],"ShippingTime":[{"Max":["0-2 days"]}],"SellerPositiveFeedbackRating":["98-100%"]}],"NumberOfOfferListingsConsidered":["1"],"SellerFeedbackCount":["5419"],"Price":[{"LandedPrice":[{"CurrencyCode":["USD"],"Amount":["21.00"]}],"ListingPrice":[{"CurrencyCode":["USD"],"Amount":["21.00"]}],"Shipping":[{"CurrencyCode":["USD"],"Amount":["0.00"]}]}],"MultipleOffersAtLowestPrice":["False"]}]}]}]}],"ResponseMetadata":[{"RequestId":["57bd24b5-274c-417b-93b6-80ee4f3cce5f"]}]}}')
      let cleanString = '[{"amzn_asin":"B00H1I639Q","amzn_price_fbm":21}]'
      expect(JSON.stringify(Util.cleanAmznDetails(unclean))).to.equal(cleanString)
    })
  })

  describe('#log', function () {

    it('should exist', function () {
      expect(Util.log).to.exist
      expect(Util.log).is.a('function')
    })

    it('should return undefined', function() {
      expect(Util.log('Hello world')).to.be.undefined
    })

  })

  describe('#authenticate', function () {

    it('should exist', function () {
      expect(Util.authenticate).to.exist
        expect(Util.authenticate).is.a('function')
    })

  })

  describe('#jwtUnauth', function () {

    it('should exist', function () {
      expect(Util.jwtUnauth).to.exist
        expect(Util.jwtUnauth).is.a('function')
    })

  })

});
