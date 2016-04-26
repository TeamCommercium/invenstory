'use strict'
/**
 * module
 * @module User
 */
 var env = require('../modules/config.js').state.env
 var config = require('../../knexfile.js')[env]
 var db = require('knex')(config)
 var log = require('../modules/utilities.js').log;

/**
 * getUserFromAmznId - Retreive userid based on the amazon Oauth userid.
 *
 * @param  {string} amznId amazonId from login
 * @return {Promise}       Resolves to userId from users table
 */

var getUserFromAmznId = function (amznId) {
  log('Looking up user with amzn id: ', amznId)
   return db('users')
            .where({amzn_profile_id:amznId})
            .select('id')
}

/**
 * createUser - Create a new user.
 * @param {Object}    params  Properties mws_auth_token, seller_id, mws_marketplace.
 * @param {string}    params.mws_auth_token
 * @param {integer}   params.seller_id
 * @param {string}    params.mws_marketplace
 * @param {string}    params.amzn_profile_id
 * @param {string}    params.amzn_username
 * @param {string}    params.amzn_email
 * @param {string}    params.amzn_zip
 * @param {string}    params.amzn_accessToken
 * @param {string}    params.amzn_refreshToken
 * @return {Promise}  Resolves to user id from the newly created user.
 */
var createUser = function (params) {
  log('Creating user: ',params)
  return db()
          .table('users')
          .returning('id')
          .insert(params)
}

/**
 * updateUser - Update a user record.
 *
 * @param {Object}    params            Properties to update.
 * @param {integer}   params.id         User to update.
 * @param {string}    params.mws_auth_token
 * @param {integer}   params.seller_id
 * @param {string}    params.mws_marketplace
 * @return {integer}  Resolves to user id from the newly created user.
 */
exports.updateUser = function (params){
  let id = params.id;
  delete params.id;

  return db('users')
    .where({id:id})
    .update(params)

}

/**
 * findOrCreateUser - Generator function yields results of userid, next user creation. Creates a new user if necessary.
 *
 * @param  {type} amznId    User's amazon oauth profile id.
 * @return {Promise}        Resolves to id.
 */
exports.findOrCreateUser = function (amznId) {

  return getUserFromAmznId(amznId)
    .then(function(id) {
      log('Searched for user, result:', id)
      if(!id[0]) {
        return createUser({amzn_profile_id:amznId})
      }
      return id[0]
    })

  // let id = yield db('users')
  //         .select('id')
  //         .where({amzn_profile_id:amznId})
  //         .limit(1)
  //         .then(function(data) {
  //           log('DB output for user lookup: ',data)
  //           return data
  //         })
  //         .catch(function(err) {log('Error checking for user: ', err)})
  //
  // if(id.length === 0 ) id = yield db('users')
  //         .returning('id')
  //         .insert({amzn_profile_id:amznId})
  //
  // return id;
}

/**
 * getUserProfileInfo - Returns the signed in user's username, email, and zipcode
 * 
 * @param {integer} userId unique user ID
 * @return {Promies}  Resolves to the user's username, email, and zipcode
 */
exports.getUserProfileInfo = function(userId) {

  return db('users')
    .where({id: userId})
    .select('amzn_username', 'amzn_email', 'amzn_zip')

}
