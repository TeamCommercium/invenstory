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
exports.addProduct = function (asin) {
   return Promise.resolve(id)
}

/**
 * getProductId - Returns the internal product id of a product with the given ASIN.
 *
 * @param  {string}   amzn_asin  Amazon Standard Identification Number
 * @return {Promise}  Resolves to id of the product record.
 */
exports.getProductId = function (asin) {
   return Promise.resolve(id)
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
   return Promise.resolve(prodObj)
}

/**
 * addProductDetail - description
 *
 * @param  {type} params description
 * @return {type}        description
 */
exports.addProductDetail = function(params) {
  return Promise.resolve(id)
}
