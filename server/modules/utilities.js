

exports.cleanMatchingASIN = function(data) {
  var product = {};

  // product.amzn_title =  data
  product.amzn_title =  data.GetMatchingProductResponse.GetMatchingProductResult[0].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0]["ns2:Title"][0],
  product.amzn_description = data.GetMatchingProductResponse.GetMatchingProductResult[0].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0]["ns2:Feature"],
  product.amzn_manufacturer = data.GetMatchingProductResponse.GetMatchingProductResult[0].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0]["ns2:Manufacturer"][0],
  product.amzn_weight = data.GetMatchingProductResponse.GetMatchingProductResult[0].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0]["ns2:ItemDimensions"][0]["ns2:Weight"][0]._,
  product.amzn_thumb_url = data.GetMatchingProductResponse.GetMatchingProductResult[0].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0]["ns2:SmallImage"][0]["ns2:URL"][0],
  product.amzn_list_price = data.GetMatchingProductResponse.GetMatchingProductResult[0].Product[0].AttributeSets[0]["ns2:ItemAttributes"][0]["ns2:ListPrice"][0]["ns2:Amount"][0]
  product.amzn_sales_rank = data.GetMatchingProductResponse.GetMatchingProductResult[0].Product[0].SalesRankings[0].SalesRank[0].Rank[0]

  return product
}