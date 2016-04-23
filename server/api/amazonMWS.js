var MWS       = require ('mws-sdk-promises')
var config    = require ('../modules/config.js')
var amazonEnv = require ('../modules/config.js').amazonEnv
var utilities = require ('../modules/utilities.js')

var client = new MWS.Client(amazonEnv.accessKeyId, amazonEnv.secretAccessKey, amazonEnv.merchantId, {})
var MarketplaceId = "ATVPDKIKX0DER";

/**
 * @param  {Object}   client    client object with specific access keys
 * @param  {Object}   args      Amazon MWS API request data
 * @return {Promise}            Returns a promise that resolves into list of lowest offerings from Amazon MWS API
 */
function getLowestOfferListingsForAsin(client, args) {
  var req = MWS.Products.requests.GetLowestOfferListingsForASIN()
  req.set(args);
  return client.invoke(req);
}

/**
 * @param  {Object}   client    client object with specific access keys
 * @param  {Object}   args      Amazon MWS API request data
 * @return {Promise}            Returns a promise that resolves into list of matching product from Amazon MWS API
 */
function listMatchingProducts(client, args) {
  var req = MWS.Products.requests.ListMatchingProducts()
  req.set(args)
  return client.invoke(req)
}

/**
 * @param  {Object}   client    client object with specific access keys
 * @param  {Object}   args      Amazon MWS API request data
 * @return {Promise}            Returns a promise that resolves into a product Amazon MWS API
 */
function getMatchingProductsByAsin(client, args) {
  var req = MWS.Products.requests.GetMatchingProduct();
  req.set(args);
  return client.invoke(req);
}

//Maximum request quota: 20 requests; 
//Restore rate: 10 requests every second 
//Hourly request quota: 36000 requests per hour

/**
 * getLowestOffers - API call to get list of low prices based on Asin; up to 10/request
 * @param  {Object}   req             
 * @param  {Object}   res
 * @param  {Array}    ASINList        array of Asins as strings
 * @param  {string}   MarketPlaceID   amazon country code 
 * @return {Promise}
 */
exports.getLowestOffers = function(req, res) {
  return getLowestOfferListingsForAsin(client, {
    MarketplaceId: MarketplaceId,
    ItemCondition: 'NEW',
    ASINList: ['B00UYNAGTI','B007GE5X7S'],
  })
    .then(function(result) {
      res.send(utilities.cleanLowestOffers(result));
    })
    .catch(function(error) {
      console.error(error)
      res.send(error)
    })
}


//Maximum request quota: 20 requests; 
//Restore rate: One request every five seconds  
//Hourly request quota: 720 requests per hour

/**
 * listProductSearcg - API call to get list of products through search
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {string}   Query           search data sent to amazon
 * @param  {string}   MarketPlaceID   amazon country code 
 * @return {Promise}
 */
exports.listProductSearch = function(req, res) {
  return listMatchingProducts(client, {
    MarketplaceId: MarketplaceId,
    Query: 'Lego ant',
  })
    .then(function(result) {
      res.send(utilities.cleanListProductSearch(result));
      // res.send(result);
    })
    .catch(function(error) {
      console.error(error);
      res.send(error)
    })
}


/*
  Maximum request quota: 20 requests
  Restore rate: 2 requests every second 
  Hourly request quota: 7200 requests per hour
 */ 

/**
 * getMatchingProduct - API call to get product info based on Asin
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Array}    ASINList        array of Asins as strings
 * @param  {string}   MarketPlaceID   amazon country code 
 * @return {Promise}
 */
exports.getMatchingAsins = function(req,res) {
  return getMatchingProductsByAsin(client, {
    MarketplaceId: MarketplaceId,
    ASINList: ['B00UYNAGTI','B007GE5X7S']
  })
    .then(function(result){
      res.send(utilities.cleanMatchingAsins(result))
    })
    .catch(function(error) {
      console.error(error);
      res.send(error)
    })
}
