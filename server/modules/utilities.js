var env = require('./config.js').state.env;
var jwt_config = require('./config.js').jwtConfig
var expressJWT = require('express-jwt')

/**
 * module
 * @module Utilities
 */

/**
 * cleanMatchingAsins - Utility function that culls useful data from object from getMatchingAsins function
 *
 * @param {Object}    data  Object from Amazon api containing product info for multiple items
 * @param {string}    product.amazon_asin    Amazon Standard Identification Number
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
  console.log('Going to Clean Data')
  var items = [];
  var responseObj = data.GetMatchingProductResponse.GetMatchingProductResult;

  for (var i = 0, productsLen = responseObj.length; i < productsLen; i++) {
    var product = {};
    var attrPath = responseObj[i].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0];
  console.log('attrPath', JSON.stringify(attrPath))

    product.amzn_asin = responseObj[i].$.ASIN;
    product.amzn_title = attrPath["ns2:Title"][0];
    product.amzn_description = attrPath["ns2:Feature"].join(". ");
    product.amzn_manufacturer = attrPath["ns2:Manufacturer"][0];
    product.amzn_weight = Number(attrPath["ns2:PackageDimensions"][0]["ns2:Weight"][0]._);
    product.amzn_thumb_url = attrPath["ns2:SmallImage"][0]["ns2:URL"][0];
    product.amzn_list_price = attrPath["ns2:ListPrice"] ? Number(attrPath["ns2:ListPrice"][0]["ns2:Amount"][0]) : null;
    product.amzn_sales_rank = Number(responseObj[i].Product[0].SalesRankings[0].SalesRank[0].Rank[0]);

    items.push(product);
  }
  return items;
}

/**
 * cleanLowestOffers - Utility function that culls useful data from object from getLowestOffers function
 *
 * @param {Object}    data    Object from Amazon api containing product info for multiple items
 * @param {String}    product.amazon_asin    Amazon Standard Identification Number
 * @param {float}     product.price_fba   Lowest FBA (Fulfilled by Amazon) price available for item
 * @param {float}     product.price_fbm   Lowest FBM (Fulfilled by Merchant) price available for item
 * @return {Array}    items   Array of objects containing culled pricing data for multiple items
 */
exports.cleanAmznDetails = function(data) {
  var list = [];
  var responseObj = data.GetLowestOfferListingsForASINResponse.GetLowestOfferListingsForASINResult;

  for (var i = 0, productsLen = responseObj.length; i < productsLen; i++) {
    var priceArr = responseObj[i].Product[0].LowestOfferListings[0].LowestOfferListing;
    var product = {};

    product.amazon_asin = responseObj[i].$.ASIN;

    for (var j = 0, pricesLen = priceArr.length; j < pricesLen; j++) {
      var fulfillmentChannel = priceArr[j].Qualifiers[0].FulfillmentChannel[0];
      var price = priceArr[j].Price[0].LandedPrice[0].Amount[0];
      if (fulfillmentChannel === "Amazon") {
        if (!product.amzn_price_fba) {
          product.amzn_price_fba = Number(price);
        }
      } else if (!product.amzn_price_fbm) {
        product.amzn_price_fbm = Number(price);
      }
    }
    list.push(product);
  }
  return list;
}

/**
 * cleanListProductSearch - Utility function that culls useful data from object from ListProductSearch function
 *
 * @param {Object}    data  Object from Amazon api containing search results
 * @param {string}    product.amazon_asin    Amazon Standard Identification Number
 * @param {string}    product.amzn_title    Title of item
 * @param {string}    product.amzn_description    Description of item
 * @param {string}    product.amzn_manufacturer   Manufacturer of item
 * @param {float}     product.amzn_weight   Weight of item in lbs
 * @param {string}    product.amzn_thumb_url    Url to thumbnail
 * @param {integer}   product.amzn_sales_rank   Amazon sales rank of item
 * @return {Array}    items  Array of objects containing culled product data for multiple items
 */
exports.cleanListProductSearch = function(data) {
  var items = [];
  var responseObj = data.ListMatchingProductsResponse.ListMatchingProductsResult[0].Products[0].Product;

  // Api call will return up to 10 results, we use the first 4
  var productsLen = responseObj.length >= 4 ? 4 : responseObj.length;
  for (var i = 0; i < productsLen; i++) {
    var product = {};
    var attrPath = responseObj[i].AttributeSets[0]["ns2:ItemAttributes"][0];

    product.amazon_asin = responseObj[i].Identifiers[0].MarketplaceASIN[0].ASIN[0];
    product.amazon_title = attrPath["ns2:Title"][0];
    product.amzn_description = attrPath["ns2:Feature"].join(". ");
    product.amzn_manufacturer = attrPath["ns2:Manufacturer"][0];
    product.amzn_weight = Number(attrPath["ns2:PackageDimensions"][0]["ns2:Weight"][0]._);
    product.amzn_thumb_url = attrPath["ns2:SmallImage"][0]["ns2:URL"][0];
    product.amzn_sales_rank = Number(responseObj[i].SalesRankings[0].SalesRank[0].Rank[0]);

    items.push(product);
  }
  return items;
}

/**
 * log - Utility function console logs in dev mode
 *
 * @param {Array} [args] Arguments to pass to console.log
 * @return {undefined}
 */
exports.log = function() {
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
