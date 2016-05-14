'use strict'

/* Amazon Price Service Modules
 * @module Amazon Price Service Module
 */

var log        = require('./utilities').log
var amazonEnv  = require ('./config').amazonEnv
var utilities  = require ('./utilities')
var Products   = require('../models/products_model')
var config     = require('./config').service
var db         = require('./config').db
var amznUtil   = require('../api/amazonMWS')
var dateFormat = require('dateformat')

/**
* init - Initialization function sets interval to run the service
*/
exports.init = function() {

  setInterval(amznPriceSvc, config.svcFreq)
}

/**
 * preBatch - Selects the ASIN to include in the batch
 *
 * @return {Promise}  Promise that resolves to array of 10 products with oldest fetch_date
 */

function preBatch() {
  //Retreive the ASINs for this batch
  return db('products')
    .select('amzn_asin','id')
    .where('fetch_date', '<', dateFormat(new Date(new Date().getTime()-config.maxProdFreq), 'yyyy-mm-dd HH:MM:ss Z', true))
    .limit(10)
    .orderBy('fetch_date')
}
/**
 * amznPriceSvc - Runner fuction to execute the Amazon price service business logic.
 *
 */
function amznPriceSvc() {

    preBatch()
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
            (data) => log('Batch price update complete', data)
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

  let batchTime = this.batchTime = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss Z', true);
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
