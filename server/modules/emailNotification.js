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
              return Object.assign(userObj, {products: products})
            })
          
        })
      )
    })
    .then(result => {
      console.log('email objects2: ',result)
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
 * [getDataByEmail description]
 * @param  {[type]} email [description]
 * @return {[type]}       [description]
 */
function getDataByEmail(email) {
  
  return getUserIDFromEmail(email)
    .then(userID => {
      conole.log('getuserIdfrom email resp', userID)
      return Products.getProducts(userID)
    })
    .then(result => {
      console.log('result of get product by email', result)
    })
}

/**
 * [getUserIDFromEmail description]
 * @param  {[type]} email [description]
 * @return {[type]}       [description]
 */
function getUserIDFromEmail(email) {
  return db('users')
    .select('id')
    .where({amzn_email: email})
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




