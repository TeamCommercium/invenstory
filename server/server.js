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
 * @apiSuccess  {Object}   inventory New product listing.
 * @apiSuccess  {number}   inventory.id id of product listing.
 * @apiSuccess  {number}   inventory.product_id id of product listing.
 * @apiSuccess  {number}   inventory.purchase_price Purchase price of new product listing in USD.
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
  * @apiSuccess {number} products.quantity Quantity of product listing in inventory.
  * @apiSuccess {number} products.purchase_price Average purchase price of in stock inventory.
  * @apiSuccess {string} products.amzn_title Quantity of new product listing.
  * @apiSuccess {string} products.amzn_description Description of product listing.
  * @apiSuccess {number} products.amzn_price Current price of product on Amazon.
  * @apiSuccess {number} products.amzn_rank Current sales ranks of product on Amazon.
  * @apiSuccess {number} products.amzn_weight Shipping weight of product.
  * @apiSuccess {number} products.amzn_manuf Product manufacturer.
  * @apiSuccess {timestamp} products.amzn_price_time Timestamp of when sale price was last checked.
  *
  * @apiDescription Endpoint to add a new product. Response parameters with the "amzn" prefix represent data retreived from the Amazon API.
  */

 /**
  * @api {put} /inventory/ship/:id Update Product Listing
  * @apiName UpdateProduct
  * @apiGroup product
  * @apiUse restricted
  *
  * @apiDescription Endpoint to allow user to update user's own product.
  *
  * @apiParam {Object} product Updated product to update.
  * @apiParam {string} product.id ID of product to update.
  * @apiParam {number} product.quantity quantity shipped.
  * @apiSuccess {Object} product Return updated product listing. See /api/product/list.
  */

/**
 * @api {delete} /product/delete Delete Product Listing
 * @apiName DeleteProduct
 * @apiGroup product
 * @apiUse restricted
 *
 * @apiParam {string} id Product listing id whose inventory should be deleted delete.
 * @apiError (404 Not found) err Not found.
 * @apiSuccessExample success-response:
 *  HTTP/1.1 204 OK
 *
 * @apiDescription Endpoint to allow user to delete all of their own inventory records for a product.
 */
