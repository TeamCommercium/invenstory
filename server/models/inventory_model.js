/**
 * module
 * @module Inventory
 */


/**
 * addInventory - Insert new inventory record(s)
 *
 * @static
 * @param  {integer} userId        The user this inventory belongs to.
 * @param  {integer} productId     description
 * @param  {integer} quantity      Number of inventory records to create
 * @param  {date} purchaseDate  Date the inventory was purchased.
 * @param  {float} purchasePrice Priace at which the inventory was purchased.
 * @param  {string} sku           SKU
 * @return {Promise}            Resolves to true if the inventory is added.
 */
function addInventory(userId, productId, quantity, purchaseDate, purchasePrice, sku) {

  // return ;
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

  // return true;
}


/**
 * shipInventory - Changes shipped status the oldest quantity inventories of a given product.
 *
 * @static
 * @param  {integer} productId Product Id from products table.
 * @param  {integer} userId    User Id from users table.
 * @param  {integer} quantity  Quantity to mark as shipped.
 * @return {Promise}           Returns true if successfull, false if failed.
 */
function shipInventory(productId, userId, quantity) {
  return;
}

/**
 * getInventory - Returns list of inventory subject to constraints passed in.
 *
 * @static
 * @param  {integer} productId   Product Id from products table.
 * @param  {integer} userId      description
 * @param  {integer} inventoryId description
 * @return {Promise}             description
 */
function getInventory(productId, userId, inventoryId) {

  return
}

module.exports = {
    addInventory: addInventory,
    deleteInventory: deleteInventory,
    shipInventory: shipInventory,
    getInventory: getInventory,
}
