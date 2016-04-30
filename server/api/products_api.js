'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var log = require('../modules/utilities.js').log;
var env = require('../modules/config.js').state.env
var Inventory = require('../models/inventory_model.js')
var Products = require('../models/products_model.js')
var router = express.Router()

.use(bodyParser.json())

/**
 * @api {get} /products/list List User's Products
 *
 * @apiName GetProducts
 * @apiGroup product
 * @apiUse restricted
 *
 * @apiParam {string} [id] Product to list. If omitted, all user's products are returned.
 *
 * @apiSuccess {Object[]} products Returns user's product listings.
 * @apiSuccess {number} products.id id of  product.
 * @apiSuccess {number} products.quantity Quantity of product listing in inventory.
 * @apiSuccess {number} products.avg_purchase_price Average purchase price of in stock inventory.
 * @apiSuccess {string} products.amzn_title Name of product.
 * @apiSuccess {string} products.amzn_description Description of product listing.
 * @apiSuccess {number} products.amzn_price_fbm Current price of product on Amazon (fulfilled by merchant).
 * @apiSuccess {number} products.amzn_price_fba Current price of product on Amazon (fulfilled by Amazon).
 * @apiSuccess {number} products.amzn_sales_rank Current sales rank of product on Amazon.
 * @apiSuccess {number} products.amzn_weight Shipping weight of product in pounds.
 * @apiSuccess {string} products.amzn_manufacturer Product manufacturer.
 * @apiSuccess {timestamp} products.amzn_price_time Timestamp of when sale price was last checked.
 *
 * @apiDescription Endpoint to add a new product. Response parameters with the "amzn" prefix represent data retreived from the Amazon API.
 */

 .get('/list', function(req, res) {
  let params = req.query || {}
  params.user_id = req.user.id
  log("Web service request to list user's products: ", params)
  Products.getProducts(params.user_id, params.product_id)
    .then(function(data) {
        res.status(200).send(data)
    })
    .catch(function(err) {
      log("An error occurred getting products: ", err)
      res.status(400).send("Bad request")
    })
 })

module.exports = router;
