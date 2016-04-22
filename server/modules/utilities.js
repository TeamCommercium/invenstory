

exports.cleanMatchingASIN = function(data) {
  var amznJson = data.GetMatchingProductResponse.GetMatchingProductResult;
  var items = [];

  for (var i = 0; i < amznJson.length; i++) {
    var product = {};

    product.amzn_title = amznJson[i].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0]["ns2:Title"][0];
    product.amzn_description = amznJson[i].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0]["ns2:Feature"];
    product.amzn_manufacturer = amznJson[i].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0]["ns2:Manufacturer"][0];
    product.amzn_weight = amznJson[i].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0]["ns2:ItemDimensions"][0]["ns2:Weight"][0]._;
    product.amzn_thumb_url = amznJson[i].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0]["ns2:SmallImage"][0]["ns2:URL"][0];
    product.amzn_list_price = amznJson[i].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0]["ns2:ListPrice"][0]["ns2:Amount"][0];
    product.amzn_sales_rank = amznJson[i].Product[0].SalesRankings[0].SalesRank[0].Rank[0];

    items.push(product);
  }
  return items;
}
