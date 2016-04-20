var MWS = require ('mws-sdk-promises')


var client = new MWS.Client(accessKeyId, secretAccessKey, merchantId, {})
var MarketplaceId = "ATVPDKIKX0DER";

function getServiceStatus(client, args) {
  var req = MWS.Products.requests.GetServiceStatus();
  req.set(args);
  return client.invoke(req);
}

function getLowestOfferListingsForASIN(client, args) {
  var req = MWS.Products.requests.GetLowestOfferListingsForASIN();
  req.set(args);
  return client.invoke(req);
}

exports.getAmazonStatus = function(req,res) {
  getServiceStatus(client, {})
    .then(function(RESULT){
      console.log("--------");
      res.send(JSON.stringify(RESULT));
      console.log("--------");
    })
    .catch(function(error) {
      console.error(error);
      res.send(error)
    })
}

exports.getLowestOffers = function(req,res) {
  getLowestOfferListingsForASIN(client, {
    MarketplaceId: MarketplaceId,
    ItemCondition: 'NEW',
    ASINList: 'B00IDBUM2O',
  })
    .then(function(RESULT){
      console.log("--------");
      res.send(JSON.stringify(RESULT));
      console.log("--------");
    })
    .catch(function(error) {
      console.error(error);
      res.send(error)
    })
}
