import express from 'express'
import path from 'path'
import webServer from './modules/configs.js'
const app = express()

app.use(express.static(path.join(__dirname, '../dist')))

app.get('/', (req,res) => res.send())


app.listen(webServer.port, ()=>{console.log("Listening on", process.env.PORT)})


/**
 * @apiDefine restricted Restricted content
 *  Restricts access to authorized users.
 * @apiHeader (auth) {String} Authorization PassesJWT to auth header
 * @apiError (401 Unauthorized) err User not authenticated.
 * @apiError (404 Not found) err Not found.
 */

 /**
  * @apiDefine public Public endpoints
  *  Endpoint may be accessed without credentials.
  * @apiError (404 Not found) err Not found.
  */

/**
 * @api {get}  /auth/amazon Login
 * @apiName authAmazon
 * @apiGroup Auth
 * @apiDescription Endpoint to initiate Amazon authentication.
 * @apiUse public
 */

/**
 * @api {post} /auth/amazon/callback Amazon Oauth Callback
 * @apiName AmazonOauthCallback
 * @apiGroup Auth
 * @apiDescription Endpoint to initiate Amazon authentication. NOT SURE THIS IS RIGHT.
 * @apiUse public
 * @apiPermission none
 *
 * @apiSuccess (200) {Object} jwt Serialized JWT
 *
 */

 /**
  * @api {get} /logout Logout
  * @apiName Logout
  * @apiGroup Auth
  * @apiUse restricted
  * @apiPermission user
  *
  * @apiDescription Endpoint to cause user's credentials to expire.
  */


/**
 * @api {post} /api/inventory/add Add Product Listing
 *
 * @apiName AddProduct
 * @apiGroup product
 * @apiUse restricted
 *
 * @apiParam    {Object}   Inventory  Object with new inventory listing attributes.
 * @apiParam    {string}   [inventory.asin] ASIN of product
 * @apiParam    {string}   [inventory.isbn] ISBN of product
 * @apiParam    {string}   [inventory.product_id] Associated product id.
 * @apiParam    {number}   inventory.purchase_price Purchase price of new product listing in USD.
 * @apiParam    {date}     inventory.purchase_date Purchase price of new product listing in USD.
 * @apiParam    {number}   inventory.quantity Inventory product listing.
 * @apiParam    {Boolean}  [inventory.shipped=false] Set shipped status.
 * @apiSuccess  {Object}   inventory New product listing.
 * @apiSuccess  {number}   inventory.id id of product listing.
 * @apiSuccess  {number}   inventory.product_id id of product listing.
 * @apiSuccess  {number}   inventory.purchase_price Purchase price of new product listing in USD.
 * @apiSuccess  {Boolean}  inventory.shipped New product listing shipped status.
 *
 * @apiDescription Endpoint to add inventory. The server will lookup (create if necessary) the associated product id based on the supplied
 */

 /**
  * @api {get} /product/list/:id List User's Products
  *
  * @apiName GetProducts
  * @apiGroup product
  * @apiUse restricted
  *
  * @apiParam {string} [id] Product to list. If omitted, all users products are returned.
  *
  * @apiSuccess {Object[]} products Returns user's product listings.
  * @apiSuccess {String} products.id id of new product listing.
  * @apiSuccess {string} products.title Quantity of new product listing.
  * @apiSuccess {string} products.description Description of product listing.
  * @apiSuccess {Object[]} products.inventory Listing of inventory.
  * @apiSuccess {number} products.inventory Purchase of product listing in USD.
  * @apiSuccess {number} products.sale_price Quantity of product listing in inventory.
  * @apiSuccess {timestamp} products.sale_price_time Timestamp of when sale price was last checked.
  * @apiSuccess {Boolean} products.shipped Shipped status of product listing.
  *
  * @apiDescription Endpoint to add a new product.
  */

 /**
  * @api {put} /product/update Update Product Listing
  * @apiName UpdateProduct
  * @apiGroup product
  * @apiUse restricted
  *
  * @apiDescription Endpoint to allow user to update user's own product.
  *
  * @apiParam {Object} product Updated product to update.
  * @apiParam {string} product.id ID of product to update.
  * @apiParam {string} product.title New product listing title.
  * @apiParam {string} product.description New product listing description.
  * @apiParam {number} product.quantity New quantity to update.
  * @apiParam {boolean} product.shipped Set shipped status.
  * @apiSuccess {Object} product Return updated product listing.
  * @apiSuccess {string} product.id ID of updated product listing.
  * @apiSuccess {number} product.title Title of updated product listing.
  * @apiSuccess {string} product.description Description of updated product listing.
  * @apiSuccess {number} product.quantity Quantity of updated product listing.
  * @apiSuccess {Boolean} product.shipped Status of updated product listing.
  */

/**
 * @api {delete} /product/delete Delete Product Listing
 * @apiName DeleteProduct
 * @apiGroup product
 * @apiUse restricted
 *
 * @apiParam {string} id Product listing id to delete.
 * @apiError (404 Not found) err Not found.
 * @apiSuccessExample success-response:
 *  HTTP/1.1 204 OK
 *
 * @apiDescription Endpoint to allow user to delete user's own product. For security purposes, an authorized deletion should return a 404, as well.
 */
