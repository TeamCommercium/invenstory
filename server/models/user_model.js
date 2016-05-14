'use strict'
/**
 * module
 * @module User
 */
 let env = require('../modules/config').state.env
 let db = require('../modules/config').db
 let log = require('../modules/utilities').log

/**
 * getUserFromAmznId - Retreive userid based on the amazon Oauth userid.
 *
 * @param  {string} amznId amazonId from login
 * @return {Promise}       Resolves to userId from users table
 */

const getUserFromAmznId = function (amznId) {
  log('Looking up user with amzn id: ', amznId)
   return db('users')
            .where({amzn_profile_id:amznId})
            .select('id')
            .then(function(result){
              log('Found user: ', result[0])
              if (result[0])
                return result[0].id
              return null
            })
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
const createUser = function (params) {
  log('Creating user: ',params)
  return db()
          .table('users')
          .returning('id')
          .insert(params)
}

/**
 * findOrCreateUser - Returns user.id for existing or new user (if necessary).
 *
 * @param  {Object} params                        User's amazon oauth profile information.
 * @param {string}  params.amazon_id              User's Amazon Oauth Profile id
 * @param {string}  params.username                 User's Amazon display name
 * @param {string}  params.email                    User's email from Amazon.
 * @param {string}  params.zipcode                  User's zip +4 from Amazon with a hyphen
 * @param {string}  params.amazon_accessToken      User's access token from Amazon
 * @param {string}  params.amazon_refreshToken     User's refreshToken from Amazon
 * @return {Promise}        Resolves to id.
 */
exports.findOrCreateUser = function (params) {

  return getUserFromAmznId(params.amazon_id)
    .then(function(id) {
      log('Searched for user, result:', id)
      if(!id) {
        params = {
          amzn_profile_id: params.amazon_id,
          amzn_username: params.username,
          amzn_email: params.email,
          amzn_zip: params.zipcode,
          amzn_accessToken: params.amazon_accessToken,
          amzn_refreshToken: params.amazon_refreshToken
        }
        return createUser(params)
                .then(result => { return {id:result[0]} })
      }
      return Promise.resolve({id: id})
    })
}

/**
 * getUserProfileInfo - Returns the signed in user's username, email, and zipcode
 *
 * @param {integer} userId unique user ID
 * @return {Promies}  Resolves to an array containing an object with the user's username, email, and zipcode
 */
exports.getUserProfileInfo = function(userId) {

  return db('users')
    .where({id: userId})
    .select('amzn_username', 'amzn_email', 'amzn_zip')
}


/**
 * updateUserInfo - Updates user data in teh database
 *
 * @param  {integer} userId   Internal user.id
 * @param  {Object} userInfo Object containing data to update
 * @param {string}  userInfo.amzn_username Username
 * @param {string}  userInfo.amzn_email email
 * @param {string}  userInfo.amzn_zip zipcode
 * @return {Promise}          Resolves to an array containing an object with the user id which was updated.
 */
exports.updateUserInfo = function(userId, userInfo) {
  return db('users')
    .returning('id')
    .where({id: userId})
    .update(userInfo)
}
