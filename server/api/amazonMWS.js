const MWS       = require ('mws-sdk-promises')
const amazonEnv = require ('../modules/config').amazonEnv
const utilities = require ('../modules/utilities')
const log       = require('../modules/utilities').log
const Products  = require('../models/products_model')

const client = new MWS.Client(amazonEnv.accessKeyId, amazonEnv.secretAccessKey, amazonEnv.merchantId, {})

/**
 * @param  {Object}   client    Client object with specific access keys
 * @param  {Object}   args      AmazonMWS API request data
 * @return {Promise}            Returns a promise that resolves into list of lowest offerings from AmazonMWS API
 */
function getLowestOfferListingsForAsin(client, args) {
  const req = MWS.Products.requests.GetLowestOfferListingsForASIN()
  req.set(args)
  return client.invoke(req)
}

/**
 * @param  {Object}   client    Client object with specific access keys
 * @param  {Object}   args      AmazonMWS API request data
 * @return {Promise}            Returns a promise that resolves into a product AmazonMWS API
 */
function getMatchingProductsByAsin(client, args) {
  const req = MWS.Products.requests.GetMatchingProduct()
  req.set(args)
  return client.invoke(req)
}

/**
 * getAmznDetails - API call to get lowest FBA and FBM price based on ASIN
 * Maximum request quota: 20 requests (up to 10 ASINs per request)
 * Restore rate: 10 requests every second
 * Hourly request quota: 36000 requests per hour
 *
 * @param  {string}   asin
 * @return {Promise}
 */
exports.getAmznDetails = function(asins) {
  return getLowestOfferListingsForAsin(client, {
    MarketplaceId: amazonEnv.marketplaceId,
    ItemCondition: 'NEW',
    ASINList: asins,
  })
    .then(result => {
      log("Retreived price data for,", result)
      if(result.ErrorResponse) log(result.ErrorResponse.Error)
      return utilities.cleanAmznDetails(result)
    })
    .catch(error => log('Error retreiving price data:', error))
}

/**
 * getMatchingProductByAsin - API call to get product info based on ASIN
 * Maximum request quota:  20 requests (up to 10 ASINs per request)
 * Restore rate:           2 requests every second
 * Hourly request quota:   7200 requests per hour
 *
 * @param  {string}   asin
 * @param  {Array}    ASINList        Array of ASINs as strings
 * @return {Promise}
 */
exports.getMatchingProductByAsin = function(asin) {
  log('getMatchingProductByAsin', asin)
  return getMatchingProductsByAsin(client, {
    MarketplaceId: amazonEnv.marketplaceId,
    ASINList: [asin]

  })
    .then(result => {
      log('Result of AmazonApi product fetch ', result)
      return Products.editProduct(utilities.cleanMatchingAsins(result)[0])
    })
    .catch(error => log('Error of AmazonApi product fetch', error))
}
