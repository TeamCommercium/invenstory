'use strict'

var env = require('../modules/config.js').state.env
var config = require('../../knexfile.js')[env]
var db = require('knex')(config)
var log = require('../modules/utilities.js').log;
var amazonMWS = require('../api/amazonMWS.js');
/**
 * module
 * @module Products
 */

 /**
  * getProducts - Retreive summary data for product(s).
  *
  * @param  {string}   amzn_asin  Amazon Standard Identification Number
  * @param  {integer} [productId]  Amazon Standard Identification Number
  * @return {Promise}  Resolves to id of the newly created record.
  */
 exports.getProducts = function (userId, productId) {
     log('Getting products for user:', userId)

    //Passing an undefined value to a where clause in knex seems to include the search term, so build the clause here.
    let whereClause = {"inventory.user_id":userId,
                        "shipped":false};
    if(productId) whereClause['inventory.product_id'] = productId;

    return db('products')
              .join('inventory', 'inventory.product_id', 'products.id')
              .leftJoin('product_details', function() {
                this.on('product_details.product_id','products.id').andOn('products.fetch_date', 'product_details.amzn_fetch_date')
              } )
              .select('products.id', 'products.amzn_title','products.amzn_description', 'product_details.amzn_price_fbm', 'inventory.sku as seller_sku', 'products.amzn_asin', 'product_details.amzn_price_fba', 'products.amzn_sales_rank', 'amzn_weight', 'amzn_manufacturer')
              .groupBy('inventory.product_id')
              .avg('purchase_price as avg_purchase_price')
              .count('inventory.product_id as quantity')
              .where(whereClause)
              .then(function(data){
                log('Get products is complete:',data)
              return data})
 }

/**
 * addProduct - Create a new product record.
 *
 * @param  {string}   amzn_asin  Amazon Standard Identification Number
 * @return {Promise}  Resolves to id of the newly created record.
 */
exports.addProduct = function (asin) {
    log('Create product with ASIN:', asin)
   return db('products').returning('id').insert({amzn_asin: asin}).then(function(resp) {
    amazonMWS.getMatchingProductByAsin(asin)
     return resp[0]
   })
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
 * editProduct - Edit product record requires either product.id or amzn_asin
 *
 * @param  {Object}   params  All parameters
 * @param  {string}   [params.id]  Internal id of product to edit.
 * @param  {string}   [params.amzn_asin]  Asin of product to edit.
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
  var asin = params.amzn_asin;
  var where = {};
  if (id) {
    where.id = id;
  } else {
    where.amzn_asin = asin
  }
  delete params.id;
  delete params.amzn_asin;
  log('Going to update product ', id, 'asin ', asin,' with params ', params)
   return db('products')
            .where(where)
            .update(params)
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
