'use strict'

const log        = require('./utilities').log
const db         = require('./config').db
const nodemailer = require('nodemailer')
const config     = require('./config').email
const Products   = require('../models/products_model')

/**
 * [init description]
 * @return {[type]} [description]
 */
exports.init = function(){

  setInterval(sendEmails, config.emailFreq)

}

/**
 * [sendEmails description]
 * @return {[type]} [description]
 */
exports.sendEmails = function() {

  let emailObj = []

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.emailAccount,
      pass: config.emailPassword
    }
  })

  findEmailsAndIDs()
    .then(function(emails){
      return Promise.all(
        emails.map(function(userObj) {       
          return Products.getProducts(userObj.id)
            .then(function(products) {
              return Object.assign({email: userObj.amzn_email}, {products: products})
            })
        })
      )
    })
    .then(function(result) {
      return result.map(function(emailObj) {
        return formatEmail(emailObj)
      })
    })
    .then(function(result){
      result.forEach(function(emailObj){
        sendEmail(emailObj.email, emailObj.text, transporter)
      })
    })

}

/**
 * [findEmails description]
 * @return {[type]} [description]
 */
function findEmailsAndIDs() {

  return db('users')
    .select('id', "amzn_email")
    .where('emailNotify', true)
    .orWhere('emailNotify', 1)

}

/**
 * [formatEmail description]
 * @param  {[type]} emailObj [description]
 * @return {[type]}          [description]
 */
function formatEmail(emailObj) {
  let d = new Date();
  let currentDate = d.getDate() + '/' + d.getMonth()+1 + '/' + d.getFullYear()

  let textEmail = "InvenStory Daily Email\r\n\r\nHere is the summary of your current inventory for " + currentDate + " : \r\n"

  emailObj.products.forEach(function(product){
    textEmail += "\r\nTitle: "+ product.amzn_title + "\r\n"
    textEmail += "SKU: "+ product.seller_sku + "\r\n"
    textEmail += "Quantity: "+ product.quantity + "\r\n"
    textEmail += "FBA Price: $"+ product.amzn_price_fba + "\r\n"
    textEmail += "FBM Price: $"+ product.amzn_price_fbm + "\r\n"
    textEmail += "AVG Purchase Price: $"+ product.avg_purchase_price + "\r\n\r\n"
  })

  let formattedEmailObj = {email: emailObj.email, text: textEmail}

  return formattedEmailObj
}

/**
 * [sendEmail description]
 * @param  {[type]} address       [description]
 * @param  {[type]} formattedData [description]
 * @return {[type]}               [description]
 */
function sendEmail(email, formattedData, transporter) {

  const mailOpts = {
    from: config.emailAccount,
    to: email,
    subject: 'Test Email',
    text: formattedData
  }

  transporter.sendMail(mailOpts, function(err,info) {
    if(err) {
      console.log('sending mail err: ', err)
    }
    console.log('email worked?: ', info.response)
  })

}




