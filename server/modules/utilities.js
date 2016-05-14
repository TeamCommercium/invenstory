'use strict'

var env = require('./config').state.env
var jwt_config = require('./config').jwtConfig
var expressJWT = require('express-jwt')
var log
/**
 * module
 * @module Utilities
 */

/**
 * cleanMatchingAsins - Utility function that culls useful data from object from getMatchingAsins function
 *
 * @param {Object}    data  Object from Amazon api containing product info for multiple items
 * @param {string}    product.amzn_asin    Amazon Standard Identification Number
 * @param {string}    product.amzn_title    Title of item
 * @param {string}    product.amzn_description    Description of item
 * @param {string}    product.amzn_manufacturer   Manufacturer of item
 * @param {float}     product.amzn_weight   Weight of item in lbs
 * @param {string}    product.amzn_thumb_url    Url to thumbnail
 * @param {float}     product.amzn_list_price   Retail price of item
 * @param {integer}   product.amzn_sales_rank   Amazon sales rank of item
 * @return {Array}    items  Array of objects containing culled product data for multiple items
 */
exports.cleanMatchingAsins = function(data) {
  var items = [];
  var responseArr = data.GetMatchingProductResponse.GetMatchingProductResult;

  log('Starting to Clean Data')
  for (var i = 0, productsLen = responseArr.length; i < productsLen; i++) {
    var product = {};
    var attrPath = responseArr[i].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0];

    product.amzn_asin = responseArr[i].$.ASIN
    product.amzn_title = attrPath["ns2:Title"][0];
    product.amzn_description = attrPath["ns2:Feature"] ? attrPath["ns2:Feature"].join(". ") : ''
    product.amzn_manufacturer = attrPath["ns2:Manufacturer"] ? attrPath["ns2:Manufacturer"][0] : null
    product.amzn_weight = attrPath["ns2:PackageDimensions"] && attrPath["ns2:PackageDimensions"][0]["ns2:Weight"] ? Number(attrPath["ns2:PackageDimensions"][0]["ns2:Weight"][0]._) : ''
    product.amzn_thumb_url = attrPath["ns2:SmallImage"][0]["ns2:URL"][0].replace('http://ecx.images-amazon.com','https://images-na.ssl-images-amazon.com')
    product.amzn_list_price = attrPath["ns2:ListPrice"] ? Number(attrPath["ns2:ListPrice"][0]["ns2:Amount"][0]) : null
    product.amzn_sales_rank = Array.isArray(responseArr[i].Product[0].SalesRankings[0]) ? Number(responseObj[i].Product[0].SalesRankings[0].SalesRank[0].Rank[0]) : null

    items.push(product);
  }
  return items;
}

/**
 * cleanLowestOffers - Utility function that culls useful data from object from getLowestOffers function
 *
 * @param {Object}    data    Object from Amazon api containing product info for multiple items
 * @param {String}    product.amzn_asin    Amazon Standard Identification Number
 * @param {float}     product.price_fba   Lowest FBA (Fulfilled by Amazon) price available for item
 * @param {float}     product.price_fbm   Lowest FBM (Fulfilled by Merchant) price available for item
 * @return {Array}    items   Array of objects containing culled pricing data for multiple items
 */
exports.cleanAmznDetails = function(data) {
  var list = [];
  var responseObj = data.GetLowestOfferListingsForASINResponse.GetLowestOfferListingsForASINResult;
  log('Preparing to clean price data')
  for (var i = 0, productsLen = responseObj.length; i < productsLen; i++) {
    //Initialize product object, to be inserted into results
    var product = {};
    product.amzn_asin = responseObj[i].$.ASIN;

    //Bail if data fetch fails
    if(responseObj[i].$.status === 'ClientError') {
      log('Client retreival error, skipping entry ', product.amzn_asin)
      continue
    }

    //Setup variable to point to price array. This is already ordered lowest to highest. We need to set the lowest product fba and fbm from this list.
    var priceArr = []

    if(responseObj[i].Product[0].LowestOfferListings[0].LowestOfferListing)
      priceArr = responseObj[i].Product[0].LowestOfferListings[0].LowestOfferListing

    for (let j = 0; j < priceArr.length; j++) {

      var fulfillmentChannel = priceArr[j].Qualifiers[0].FulfillmentChannel[0]
      var price = priceArr[j].Price[0].LandedPrice[0].Amount[0]

      if (fulfillmentChannel === "Amazon" && !product.amzn_price_fba) {
          product.amzn_price_fba = Number(price);
      } else if (!product.amzn_price_fbm) {
        product.amzn_price_fbm = Number(price);
      }
    }
    list.push(product);
  }
  log('Cleaned product price information', list)
  return list;
}

/**
 * log - Utility function console logs in dev mode
 *
 * @param {Array} [args] Arguments to pass to console.log
 * @return {undefined}
 */
exports.log = log = function() {
  if(env === 'development') console.log.apply(this, Array.prototype.slice.call(arguments))
}

/**
 * authenticate - Authenticate middleware to decode jwt and place user in req.user
 *
 * @private
 * @param  {Obj}    req     The request, with attached cookie
 * @return {token}  token   Token is decoded and placed in req.user
 */
exports.authenticate =
  expressJWT({
    secret: jwt_config.secret,
    getToken: function(req) {
      if( req.cookies && req.cookies.Token) {
        return req.cookies.Token
      } else {
        return null
      }
    }
  })

/**
 * jwtUnauth - Error handling middleware for JWT Authentication
 * @param  {Object}   err  Error
 * @param  {Object}   req  Request
 * @param  {Object}   res  Response
 * @param  {Function} next
 * @return {Object}        Response Object with error text and status
 */
exports.jwtUnauth = function(err, req, res, next){
  if (err.name === "UnauthorizedError") {
    res.status(401).send('Invalid User Token')
  }

}
