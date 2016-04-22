/**
 * @param  {[type]}
 * @return {[type]}
 */
exports.cleanMatchingASIN = function(data) {
  var json = data.GetMatchingProductResponse.GetMatchingProductResult;
  var items = [];

  for (var i = 0; i < json.length; i++) {
    var product = {};
    var jsonShort = json[i].Product[0].AttributeSets[0];

    product.amzn_title = jsonShort["ns2:ItemAttributes"][0]["ns2:Title"][0];
    product.amzn_description = jsonShort["ns2:ItemAttributes"][0]["ns2:Feature"];
    product.amzn_manufacturer = jsonShort["ns2:ItemAttributes"][0]["ns2:Manufacturer"][0];
    product.amzn_weight = jsonShort["ns2:ItemAttributes"][0]["ns2:ItemDimensions"][0]["ns2:Weight"][0]._;
    product.amzn_thumb_url = jsonShort["ns2:ItemAttributes"][0]["ns2:SmallImage"][0]["ns2:URL"][0];
    product.amzn_list_price = jsonShort["ns2:ItemAttributes"][0]["ns2:ListPrice"][0]["ns2:Amount"][0];
    product.amzn_sales_rank = json[i].Product[0].SalesRankings[0].SalesRank[0].Rank[0];

    items.push(product);
  }
  return items;
}

/**
 * @param  {[type]}
 * @return {[type]}
 */
exports.cleanLowestOffers = function(data) {
  var json = data.GetLowestOfferListingsForASINResponse.GetLowestOfferListingsForASINResult;
  var list = [];

  for (var i = 0; i < json.length; i++) {
    var product = {};
    var jsonShort = json[i].Product[0].LowestOfferListings[0].LowestOfferListing;
    
    product.asin = json[i].$.ASIN;
    product.price_fba = [];
    product.price_merchant = [];

    for (var j = 0; j < jsonShort.length; j++) {
      var fulfillmentChannel = jsonShort[j].Qualifiers[0].FulfillmentChannel[0];
      var price = jsonShort[j].Price[0].LandedPrice[0].Amount[0];
      fulfillmentChannel === "Amazon" ? product.price_fba.push(price) : product.price_merchant.push(price);
    }
    list.push(product);
  }
  return list;
}
