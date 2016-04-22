var env = require('./config.js').state.env;

/**
 * module
 * @module Inventory
 */

/**
 * cleanMatchingAsins Does stuff.
 * @param {String}    items.amzn_title The title of the item.
 * @param  {Array}    data Data from amazon
 * @param {Object[]}  items Array of items.
 * @return {String}   items.amzn_title The title of the item.
 */
exports.cleanMatchingAsins = function(data) {
  var responseArr = data.GetMatchingProductResponse.GetMatchingProductResult;
  var items = [];

  for (var i = 0, len = responseArr.length; i < len; i++) {
    var product = {};
    var attrPath = responseArr[i].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0];

    product.asin = responseArr[i].$.ASIN;
    product.amzn_title = attrPath["ns2:Title"][0];
    product.amzn_description = attrPath["ns2:Feature"].join(". ");
    product.amzn_manufacturer = attrPath["ns2:Manufacturer"][0];
    product.amzn_weight = Number(attrPath["ns2:ItemDimensions"][0]["ns2:Weight"][0]._);
    product.amzn_thumb_url = attrPath["ns2:SmallImage"][0]["ns2:URL"][0];
    product.amzn_list_price = Number(attrPath["ns2:ListPrice"][0]["ns2:Amount"][0]);
    product.amzn_sales_rank = Number(responseArr[i].Product[0].SalesRankings[0].SalesRank[0].Rank[0]);

    items.push(product);
  }
  return items;
}

/**
 * cleanMatchingAsins - Does stuff.
 *
 * @param  {Array} data Data from amazon
 * @return {Object[]} items Array of items.
 * @return {String} items.amzn_title The title of the item.
 */
exports.cleanLowestOffers = function(data) {
  var responseArr = data.GetLowestOfferListingsForASINResponse.GetLowestOfferListingsForASINResult;
  var list = [];

  for (var i = 0, len = responseArr.length; i < len; i++) {
    var product = {};
    var priceArr = responseArr[i].Product[0].LowestOfferListings[0].LowestOfferListing;
    product.asin = responseArr[i].$.ASIN;

    for (var j = 0; j < priceArr.length; j++) {
      var fulfillmentChannel = priceArr[j].Qualifiers[0].FulfillmentChannel[0];
      var price = priceArr[j].Price[0].LandedPrice[0].Amount[0];
      if (fulfillmentChannel === "Amazon") {
        if (!product.price_fba) {
          product.price_fba = Number(price);
        }
      } else if (!product.price_fbm) {
          product.price_fbm = Number(price);
      }
    }
    list.push(product);
  }
  return list;
}

exports.log = function() {
  if(env === 'development') console.log.apply(this, Array.prototype.slice.apply(null,arguments))
}
