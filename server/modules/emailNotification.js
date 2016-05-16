'use strict'

/**
 * Email Notification Module
 * @module Email Notification Module
 */

const log        = require('./utilities').log
const db         = require('./config').db
const nodemailer = require('nodemailer')
const config     = require('./config').email
const Products   = require('../models/products_model')

/**
 *  init - Initialize function set interval to run the service
 */
exports.init = function(){

  setInterval(sendAllEmails, config.emailFreq)

}

/**
 * sendEmails - Function that sends Daily Inventory Update Emails
 * 
 */
function sendAllEmails() {

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
        let date = new Date()
        let currentDate = date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear()
        sendEmail(emailObj.email, emailObj.text, transporter, "InvenStory Daily Update " + currentDate)
      })
    })

}

/**
 * findEmails - Finds the User emails and IDs that have signed up for notification emails
 * @return {Promise} Promise that resolves into userIDs and Emails who want to updates
 */
function findEmailsAndIDs() {

  return db('users')
    .select('id', "amzn_email")
    .where('emailNotify', true)
    .orWhere('emailNotify', 1)

}

/**
 * formatEmail - Formats each users inventory into and updated email
 * @param  {Object} emailObj  Object containing id, email address, user's products 
 * @return {String} formattedEmailObj Returns the user's inventory email in text form          
 */
function formatEmail(emailObj) {
  let d = new Date();
  let currentDate = d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear()

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
 * sendEmail - Module to send various emails
 * @param  {String} email         Email Address
 * @param  {String} formattedData Text Body for email
 * @param  {Object} transporter   Transporter Object
 * @param  {String} subject       Email Subject
 * 
 */
function sendEmail(email, formattedData, transporter, subject) {

  const mailOpts = {
    from: config.emailAccount,
    to: email,
    subject: subject,
    text: formattedData
  }

  transporter.sendMail(mailOpts, function(err,info) {
    if(err) {
      console.log('sending mail err: ', err)
    }
    console.log('email worked?: ', info.response)
  })

}




