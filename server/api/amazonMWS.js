var MWS       = require ('mws-sdk-promises')
var amazonEnv = require ('../modules/config.js').amazonEnv
var utilities = require ('../modules/utilities.js')
var log       = require('../modules/utilities.js').log;
var Products  = require('../models/products_model.js')

var client = new MWS.Client(amazonEnv.accessKeyId, amazonEnv.secretAccessKey, amazonEnv.merchantId, {})
// Amazon country code defaults to US
// var MarketplaceId = "ATVPDKIKX0DER";

/**
 * @param  {Object}   client    Client object with specific access keys
 * @param  {Object}   args      AmazonMWS API request data
 * @return {Promise}            Returns a promise that resolves into list of lowest offerings from AmazonMWS API
 */
function getLowestOfferListingsForAsin(client, args) {
  var req = MWS.Products.requests.GetLowestOfferListingsForASIN()
  req.set(args);
  return client.invoke(req);
}

/**
 * @param  {Object}   client    Client object with specific access keys
 * @param  {Object}   args      AmazonMWS API request data
 * @return {Promise}            Returns a promise that resolves into list of matching product from AmazonMWS API
 */
function listMatchingProducts(client, args) {
  var req = MWS.Products.requests.ListMatchingProducts()
  req.set(args)
  return client.invoke(req)
}

/**
 * @param  {Object}   client    Client object with specific access keys
 * @param  {Object}   args      AmazonMWS API request data
 * @return {Promise}            Returns a promise that resolves into a product AmazonMWS API
 */
function getMatchingProductsByAsin(client, args) {
  var req = MWS.Products.requests.GetMatchingProduct();
  req.set(args);
  return client.invoke(req);
}

/**
 * getLowestOffers - API call to get lowest FBA and FBM prices based on ASIN
 * Maximum request quota: 20 requests (up to 10 ASINs per request)
 * Restore rate: 10 requests every second 
 * Hourly request quota: 36000 requests per hour
 * 
 * @param  {Object}   req             
 * @param  {Object}   res
 * @param  {Array}    ASINList          Array of ASINs as strings
 * @param  {string}   [ItemCondition]   Default: All, Options: New, Used, Collectible, Refurbished, Club
 * @param  {string}   MarketPlaceID     Amazon country code 
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
      log(error)
      res.send(error)
    })
}

/**
 * listProductSearch - API call to get list of products through search
 * Maximum request quota:  20 requests (1 ASIN per request)
 * Restore rate:           1 request every five seconds
 * Hourly request quota:   720 requests per hour
 * 
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {string}   MarketPlaceID   Amazon country code 
 * @param  {string}   Query           Search string sent to Amazon
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
      log(error);
      res.send(error)
    })
}

/**
 * getMatchingProductByAsin - API call to get product info based on ASIN
 * Maximum request quota:  20 requests (up to 10 ASINs per request)
 * Restore rate:           2 requests every second
 * Hourly request quota:   7200 requests per hour
 *
 * @param  {string}   asin
 * @param  {string}   MarketPlaceID   Amazon country code 
 * @param  {Array}    ASINList        Array of ASINs as strings
 * @return {Promise}  
 */
exports.getMatchingProductByAsin = function(asin) {
  log('ASIN', asin)
  return getMatchingProductsByAsin(client, {
    MarketplaceId: amazonEnv.marketplaceId,
    ASINList: [asin]
  })
    .then(function(result){
      log('Result of AmazonApi product fetch ', result)
      return Products.editProduct(utilities.cleanMatchingAsins(result)[0])
    })
    .catch(function(error) {
      log('Error of AmazonApi product fetch', error);
    })
}
