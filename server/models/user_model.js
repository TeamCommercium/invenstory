'use strict'
/**
 * module
 * @module User
 */
 var db = require('knex')
 var log = require('../modules/utilities.js').log;
/**
 * getUserFromAmznId - Retreive userid based on the amazon Oauth userid.
 *
 * @param  {string} amznId amazonId from login
 * @return {Promise}       Resolves to userId from users table
 */

exports.getUserFromAmznId = function (amznId) {
  log('Looking up user with amzn id: ', amznId)
   return db('users')
            .returning('id')
            .where({amzn_profile_id:amznId, })
            .select('user_id')
}

/**
 * createUser - Create a new user.
 * @param {Object}    params  Properties mws_auth_token, seller_id, mws_marketplace.
 * @param {string}    params.mws_auth_token
 * @param {integer}   params.seller_id
 * @param {string}    params.mws_marketplace
 * @return {Promise}  Resolves to user id from the newly created user.
 */
exports.createUser = function (params) {
  return db('users')
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
exports.findOrCreateUser = function* (amznId) {

  yield db('users')
          .returning('id')
          .where({amzn_profile_id:id})

  yield db('users')
          .returning('id')
          .insert({amzn_profile_id:amznId})
}
