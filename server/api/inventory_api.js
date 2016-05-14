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
 * @api {post} /inventory/add Add Product Listing
 *
 * @apiName AddProduct
 * @apiGroup product
 * @apiUse restricted
 *
 * @apiParam    {Object}   Inventory  Object with new inventory listing attributes.
 * @apiParam    {string}   [inventory.asin] ASIN of product
 * @apiParam    {string}   [inventory.product_id] Associated product id.
 * @apiParam    {number}   inventory.purchase_price Purchase price of new product listing in USD.
 * @apiParam    {date}     inventory.purchase_date Purchase price of new product listing in USD.
 * @apiParam    {number}   inventory.quantity Inventory product listing.
 * @apiSuccess  {Object}   inventory New product listing.
 * @apiSuccess  {number}   inventory.id id of product listing.
 * @apiSuccess  {number}   inventory.product_id id of product listing.
 * @apiSuccess  {number}   inventory.purchase_price Purchase price of new product listing in USD.
 *
 * @apiDescription Endpoint to add inventory. The server will lookup (create if necessary) the associated product id based on the supplied ASIN. One of these must be supplied or an error will occur.
 *
 * @apiError (400 Bad Request) Request must have an ASIN or ISBN.
 */
.post('/add', function(req, res) {
  //if product Id is not set, need to lookup or create it
  let params = req.body
  // let params = env === 'development' ? req.query : req.body
  params.user_id = req.user.id
  log("Web service request to add inventory: ", params)
  if(!params.product_id) {
    Products.findOrCreate(params.asin)
      .then(function(productId) {
        params.product_id = productId
        Inventory.addInventory(params)
          .then(function(resp) {
              log('Inventory id', resp[0], 'added')
              res.status(200).send({id:resp[0]})
          })
          .catch(function(err) {
            log("An error occurred adding inventory: ", err)
            res.status(400).send("Bad request")
          })

      })
  } else {

  Inventory.addInventory(params)
    .then(function(data) {
        res.status(200).send(data[0])
    })
    .catch(function(err) {
      log("An error occurred adding inventory: ", err)
      res.status(400).send("Bad request")
    })
  }
})
  /**
  * @api {put} /inventory/ship Set inventory status to shipped
  * @apiName UpdateProduct
  * @apiGroup product
  * @apiUse restricted
  *
  * @apiDescription Endpoint to allow user to mark user's inventory as shipped.
  *
  * @apiParam {Object} product Updated product to update.
  * @apiParam {string} product.id ID of product to update.
  * @apiParam {number} product.quantity quantity shipped.
  * @apiSuccess {Object} product Return updated product listing. See /api/product/list.
  */

  .put('/ship', function(req, res) {
   let params = req.body
   log("Web service request to ship inventory: ", params)
   Inventory.shipInventory(params.id, req.user.id, params.quantity)
     .then(function(resp) {
        log('Shipped inventory', resp)
        res.status(200).send(resp[0])
     })
     .catch(function(err) {
       log("An error occurred shipping inventory: ", err)
       res.status(400).send("Bad request")
     })
  })

/**
 * @api {delete} /inventory/delete Delete Inventory Listing
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

 .delete('/delete', function(req, res) {
  let params = req.body
  log("Web service request to delete inventory: ", params)
  Inventory.deleteInventory(params.id, req.user.id)
    .then(function(data) {
        res.status(200).send(JSON.stringify(data))
    })
    .catch(function(err) {
      log("An error occurred deleting inventory: ", err)
      res.status(400).send("Bad request")
    })
 })

 module.exports = router;
