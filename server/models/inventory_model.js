'use strict'
/**
* module
* @module Inventory
*/

var db = require('../modules/config').db
var log = require('../modules/utilities.js').log;


/**
 * addInventory - Insert new inventory record(s)
 *
 * @static
 * @param  {integer} params        New inventory parameters
 * @param  {integer} params.user_id        The user this inventory belongs to.
 * @param  {integer} params.product_id     description
 * @param  {integer} params.quantity      Number of inventory records to create
 * @param  {date} params.purchaseDate  Date the inventory was purchased.
 * @param  {float} params.purchasePrice Priace at which the inventory was purchased.
 * @param  {string} params.sku           SKU
 * @return {Promise}            Resolves to true if the inventory is added.
 */
function addInventory(params) {
  log('Adding inventory: ', params)
  var qty = params.quantity;
  var insertParams = {
    product_id:params.product_id,
    purchase_date:params.purchase_date,
    purchase_price:params.purchase_price,
    sku:params.seller_sku,
    user_id:params.user_id
  }
  var insert = [];
  for(let i=0;i<qty;i++) {
      insert.push(Object.assign({},insertParams))
  }
  return db('inventory')
          .returning('id')
          .insert(insert)
}

/**
 * deleteInventory - A user's inventory records for a given product.
 *
 * @static
 * @param  {integer} productId Id of product to be deleted.
 * @param  {integer} userId    User id to restrict access.
 * @return {Promise}           Resolves to true if successfull.
 */
function deleteInventory(productId, userId) {
  log('Deleting invetory for product ', productId, ' and user ', userId)
  return db('inventory')
          .where({product_id:productId,user_id:userId})
          .del()
}


/**
 * shipInventory - Changes shipped status the oldest quantity inventories of a given product.
 *
 * @static
 * @param  {integer} productId Product Id from products table.
 * @param  {integer} userId    User Id from users table.
 * @param  {integer} quantity  Quantity to mark as shipped.
 * @return {Promise}           Returns knex promise output.
 */
function shipInventory(productId, userId, quantity) {
  log('Shipping ', quantity, ' of product ', productId, ' for user ', userId)

  let shipIds = db.from('inventory').select('id')
  .where({shipped:0, product_id:productId, user_id:userId})
  .orderBy('purchase_date')
  .limit(quantity);

  return db('inventory')
            .whereIn('id', shipIds)
            .update({shipped:true})
}

/**
 * getInventory - Returns list of inventory subject to constraints passed in.
 *
 * @static
 *
 * @param  {Object} params   Product Id from products table.
 * @param  {integer} params.productId   Product Id from products table.
 * @param  {integer} params.userId      description
 * @param  {integer} params.inventoryId description
 * @return {Promise}             description
 */
function getInventory(params) {
  log('Getting inventory list for ', params.product_id, ' for user ', params.user_id)
  return db('inventory')
            .join('products', 'inventory.product_id', 'products.id')
            .select()
            .where(params)
}

module.exports = {
    addInventory: addInventory,
    deleteInventory: deleteInventory,
    shipInventory: shipInventory,
    getInventory: getInventory,
}
