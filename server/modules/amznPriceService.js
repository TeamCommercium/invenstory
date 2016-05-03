'use strict'

/* Amazon Price Service Modules
 * @module Amazon Price Service Module
 */

var log        = require('./utilities.js').log
var amazonEnv  = require ('./config.js').amazonEnv
var utilities  = require ('./utilities.js')
var Products   = require('../models/products_model.js')
var db         = require('./config.js').db
var amznUtil   = require('../api/amazonMWS.js')
var dateFormat = require('dateformat')

/**
* init - Initialization function sets interval to run the service
*/
exports.init = function() {

  setInterval(amznPriceSvc, 10800000)
}

/**
 * amznPriceSvc - Runner fuction to execute the Amazon price service business logic.
 *
 */
function amznPriceSvc() {

  //Retreive the ASINs for this batch
  db('products')
    .select('amzn_asin','id')
    .limit(10)
    .orderBy('fetch_date')
    .then(function(batch) {
      let theBatch = new Batch(batch)
      let asins = theBatch.asins();

      log('Preparing to retreive prices for batch.')
      amznUtil.getAmznDetails(asins)
        .then((details) => {
          log('Retreived details for batch.')
          theBatch.prepareInsert(details)
          Promise.all(
            details.map(e =>
              Products.addProductDetail(e)
                .then( resp => Products.editProduct({id: e.product_id, fetch_date:theBatch.batchTime}))
              )
          ).then(
            (data) => log('whatthen', data)
          )
          .catch(
            (err) => log('Error after details batch ', err)
          )
        })
        .catch(err => log('Error retrieving details for batch', err))
    })
}

/**
 * Batch - Batch data type to facilitate processing batches of product updates.
 * @param  {Object[]} arrayObjs
 * @param  {integer}  arrayObjs.id        From products.id
 * @param  {string}   arrayObjs.amzn_asin From products.amzn_asin
 * @return {type}           description
 */

function Batch (arrayObjs) {
  var storage = {};

  let batchTime = this.batchTime = dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss', true);
  this.asins = asins;
  this.prepareInsert = prepareInsert;

  arrayObjs.forEach((e) => {storage[e.amzn_asin] = e.id})
  log('Initialized batch storage object', storage)
  function asins() {
    return arrayObjs.map((e) => e.amzn_asin)
  }

  function prepareInsert(details) {
    details.forEach(e => {
      e.product_id = storage[e.amzn_asin]
      delete e.amzn_asin
      e.amzn_fetch_date = batchTime;
    })
  }
}
