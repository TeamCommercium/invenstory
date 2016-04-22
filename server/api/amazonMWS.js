var MWS       = require ('mws-sdk-promises')
var config    = require ('../modules/config.js')
var amazonEnv = require ('../modules/config.js').amazonEnv
var utilities = require ('../modules/utilities.js')


var client = new MWS.Client(amazonEnv.accessKeyId, amazonEnv.secretAccessKey, amazonEnv.merchantId, {})
var MarketplaceId = "ATVPDKIKX0DER";

function getLowestOfferListingsForASIN(client, args) {
  var req = MWS.Products.requests.GetLowestOfferListingsForASIN()
  req.set(args);
  return client.invoke(req);
}

function listMatchingProducts(client, args) {
  var req = MWS.Products.requests.ListMatchingProducts()
  req.set(args)
  return client.invoke(req)
}

function getMatchingProductByASIN(client, args) {
  var req = MWS.Products.requests.GetMatchingProduct();
  req.set(args);
  return client.invoke(req);
}

//Maximum request quota: 20 requests; 
//Restore rate: 10 requests every second 
//Hourly request quota: 36000 requests per hour

exports.getLowestOffers = function(req, res) {
  getLowestOfferListingsForASIN(client, {
    MarketplaceId: MarketplaceId,
    ItemCondition: 'NEW',
    ASINList: 'B00UYNAGTI',
  })
    .then(function(result){
      // var cleanResult = utilities.cleanLowestOffers(result)
      res.send(RESULT)
      // res.send(JSON.stringify(result));
    })
    .catch(function(error) {
      res.send(error)
    })
}

//Maximum request quota: 20 requests; 
//Restore rate: One request every five seconds  
//Hourly request quota: 720 requests per hour

exports.listProductSearch = function(req, res) {
  listMatchingProducts(client, {
    MarketplaceId: MarketplaceId,
    Query: '',
  })
    .then(function(result){
      res.send(JSON.stringify(result));
    })
    .catch(function(error) {
      res.send(error)
    })
}

// Finds product by ASIN
// Maximum request quota: 20 requests
// Restore rate: 2 requests every second 
// Hourly request quota: 7200 requests per hour

exports.getMatchingASIN = function(req,res) {
  getMatchingProductByASIN(client, {
    MarketplaceId: MarketplaceId,
    ASINList: ['B00UYNAGTI','B007GE5X7S']
  })
    .then(function(result){
      var cleanResult = utilities.cleanMatchingASIN(result);
      // res.send(RESULT)
      res.send(cleanResult)
    })
    .catch(function(error) {
      console.error(error);
      res.send(error)
    })
}
