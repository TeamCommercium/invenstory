'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const log = require('../modules/utilities').log
const env = require('../modules/config').state.env
const Inventory = require('../models/inventory_model')
const Products = require('../models/products_model')
const amznSearch = require('../modules/amznSearchSvc')
const router = express.Router()

.use(bodyParser.json())

/**
 * @api {get} /products/list List User's Products
 *
 * @apiName GetProducts
 * @apiGroup product
 * @apiUse restricted
 *
 * @apiParam {string} [product_id] Product to list. If omitted, all user's products are returned.
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
  Products.getProducts(params.user_id, params.product_id)
    .then(data =>  {
        res.status(200).send(data)
    })
    .catch( err => {
      log("An error occurred getting products: ", err)
      res.status(400).send("Bad request")
    })
 })

 /**
  * @api {get} /products/search List User's Products
  *
  * @apiName GetProducts
  * @apiGroup product
  * @apiUse restricted
  *
  * @apiParam {string} q String to query Amazon products database with.
  *
  * @apiSuccess {Object[]}  products Returns user's product listings.
  * @apiSuccess {string}    prodcuts.amzn_asin ASIN of found product
  * @apiSuccess {string}    products.amzn_title Name of product.
  * @apiSuccess {string}    products.amzn_description Description of product listing.
  * @apiSuccess {string}    products.amzn_manufacturer Product manufacturer.
  * @apiSuccess {number}    products.amzn_weight Shipping weight of product in pounds.
  * @apiSuccess {number}    products.amzn_thumb_url URL of thumbnail images.
  * @apiSuccess {number}    products.amzn_sales_rank Current sales rank of product on Amazon.
  *
  * @apiDescription Endpoint to add a new product. Response parameters with the "amzn" prefix represent data retreived from the Amazon API.
  */

 .get('/search', (req, res) => {

   let query = req.query.q

   log("Web service request to search for products on Amazon")

   amznSearch.listProductSearch(query)
    .then((products) => {
      log('Products found', products)
      res.status(200).send(products)
    })
    .catch((err) => {
      log("Error occurred fetching product list from Amazon: ", err)
      res.status(400).send("Bad request")
    })
 })

module.exports = router
