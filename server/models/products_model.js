'use strict'

var env = require('../modules/config.js').state.env
var config = require('../../knexfile.js')[env]
var db = require('knex')(config)
var log = require('../modules/utilities.js').log;
/**
 * module
 * @module Products
 */

 /**
  * addProduct - Create a new product record.
  *
  * @param  {string}   amzn_asin  Amazon Standard Identification Number
  * @return {Promise}  Resolves to id of the newly created record.
  */
 exports.getProducts = function (userId) {
     log('Getting products for user:', userId)
    return db('products')
              .join('inventory', 'inventory.product_id', 'products.id')
              .join('product_details', 'product_details.product_id','products.id')
              .select('products.amzn_title','products.amzn_description', 'product_details.amzn_price_fbm', 'product_details.amzn_price_fba', 'product_details.amzn_sales_rank', 'amzn_weight', 'amzn_manufacturer')
              .groupBy('products.id')
              .avg('purchase_price as avg_purchase_price')
              .count('inventory.id as quantity')
              .where({"inventory.user_id":userId})
 }

/**
 * addProduct - Create a new product record.
 *
 * @param  {string}   amzn_asin  Amazon Standard Identification Number
 * @return {Promise}  Resolves to id of the newly created record.
 */
exports.addProduct = function (asin) {
    log('Create product with ASIN:', asin)
   return db('products').returning('id').insert({amzn_asin: asin})
}
/**
 * findOrCreate - Helper function to lookup product by ASIN, create it if it does not exist, and resolve to the id in either case.
 *
 * @param  {string}   amzn_asin  Amazon Standard Identification Number
 * @return {Promise}  Resolves to id of the (newly created) record.
 */
exports.findOrCreate = function(asin) {
  log('Find or create product with ASIN:', asin)
  return exports.getProductId(asin)
    .then(function(resp) {
      if(resp[0]) {
        log("Product found, returning id ", resp[0].id)
        return resp[0].id
      }
      return exports.addProduct(asin)
    })
}

/**
 * getProductId - Returns the internal product id of a product with the given ASIN.
 *
 * @param  {string}   amzn_asin  Amazon Standard Identification Number
 * @return {Promise}  Resolves to id of the product record.
 */
exports.getProductId = function (asin) {
   return db('products').select('id').where({amzn_asin:asin});
}

/**
 * editProduct - Edit product record
 *
 * @param  {Object}   params  All parameters
 * @param  {string}   params.id  Internal id of product to edit.
 * @param  {string}   [params.amzn_title]  Product title provided by Amazon.
 * @param  {string}   [params.amzn_description]  Product description provided by Amazon.
 * @param  {string}   [params.amzn_manufacturer]  Manufacturer name provided by Amazon.
 * @param  {float}    [params.amzn_weight]  Shipping weight provided by Amazon.
 * @param  {string}   [params.amzn_thumb_url]  URL of thumbnail image provided by Amazon.
 * @param  {float}    [params.amzn_list_price]  MSRP provided by Amazon.
 * @param  {string}   [params.currency]  Defaults to 'USD'.
 * @return {Promise}  Resolves to true if updates are successful.
 */
exports.editProduct = function(params) {
  var id = params.id;
  delete params.id;
  log('Going to update product ', id, ' with params ', params)
   return db('products').where({id:id}).update(params);
}

/**
 * addProductDetail - Add product detail record.
 *
 * @param  {Object} params Product detail parameters.
 * @param  {integer} params.product_id productId Product id for which the detail is being provided.
 * @param  {flaot} params.amzn_price_fbm Amazon price fulfilled by merchant.
 * @param  {float} params.amzn_price_fba Amazon price fulfilled by seller.
 * @param  {type} params.amzn_sales_rank Amazon sales rank.
 * @return {Promise}        Resolves to integer of detail id.
 */
exports.addProductDetail = function(params) {
  return db('product_details').returning('id').insert(params);
}
