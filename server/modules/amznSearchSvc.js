'use strict'

/**
 * Amazon Search Service module
 * @module Amazon Search service
 */

 const MWS       = require ('mws-sdk-promises')
 const amazonEnv = require ('./config').amazonEnv
 const utilities = require ('./utilities')
 const log       = require('./utilities').log
 const Products  = require('../models/products_model')


 /**
  * listProductSearch - API call to get list of products through search
  * Maximum request quota:  20 requests (1 ASIN per request)
  * Restore rate:           1 request every five seconds
  * Hourly request quota:   720 requests per hour
  *
  * @param  {string}   Query           Search string sent to Amazon
  * @return {Promise}                 Promise resolves to array of search objects
  */
 exports.listProductSearch = function(query) {
   let client = new MWS.Client(amazonEnv.accessKeyId, amazonEnv.secretAccessKey, amazonEnv.merchantId, {})

   let reqObj = MWS.Products.requests.ListMatchingProducts()
   let params = {
     MarketplaceId: amazonEnv.marketplaceId,
     Query: query,
   }
   reqObj.set(params)

   return client.invoke(reqObj)
          .then( result => {
               return cleanListProductSearch(result)
            })
          .catch( err => {
               log(error)
               return error
            })
  }

 /**
  * cleanListProductSearch - Utility function that culls useful data from object from ListProductSearch function
  *
  * @param {Object}       data                        Object from Amazon api containing search results
  * @return {Object[]}    product                     Array of objects containing culled product data for multiple items
  * @return {string}      product.amazon_asin         Amazon Standard Identification Number
  * @return {string}      product.amzn_title          Title of item
  * @return {string}      product.amzn_description    Description of item
  * @return {string}      product.amzn_manufacturer   Manufacturer of item
  * @return {float}       product.amzn_weight         Weight of item in lbs
  * @return {string}      product.amzn_thumb_url      Url to thumbnail
  * @return {integer}     product.amzn_sales_rank     Amazon sales rank of item
  */
  function cleanListProductSearch(data) {
   let items = []
   let responseArr = data.ListMatchingProductsResponse.ListMatchingProductsResult[0].Products[0].Product

   for(let i = 0; i < responseArr.length; i++) {

     let product = {}
     let attrPath = responseArr[i].AttributeSets[0]["ns2:ItemAttributes"][0]

     product.amzn_asin = responseArr[i].Identifiers[0].MarketplaceASIN[0].ASIN[0]
     product.amzn_title = attrPath["ns2:Title"][0]
     product.amzn_description = attrPath["ns2:Feature"] ? attrPath["ns2:Feature"].join(". ") : ''
     product.amzn_manufacturer = attrPath["ns2:Manufacturer"] ? attrPath["ns2:Manufacturer"][0] : ''
     product.amzn_weight = attrPath["ns2:PackageDimensions"] && attrPath["ns2:PackageDimensions"][0]["ns2:Weight"] ? Number(attrPath["ns2:PackageDimensions"][0]["ns2:Weight"][0]._) : ''
     product.amzn_thumb_url = attrPath["ns2:SmallImage"][0]["ns2:URL"][0].replace('http://ecx.images-amazon.com','https://images-na.ssl-images-amazon.com') || ''
     product.amzn_sales_rank = typeof responseArr[i].SalesRankings[0] === 'object' ? Number(responseArr[i].SalesRankings[0].SalesRank[0].Rank[0]) : ''

     items.push(product)
   }
   return items
 }
