/**
 * module
 * @module User
 */

/**
 * getUserFromAmznId - Retreive userid based on the amazon Oauth userid.
 *
 * @param  {string} amznId amazonId from login
 * @return {Promise}       Resolves to userId from users table
 */

exports.getUserFromAmznId = function (amznId) {
  // return userId;
}

/**
 * expireCredentials - Logout/expire client's credentials. Not sure this will be used.
 *
 * @param  {integer} userId user whose credentials should expire.
 * @return {Promise}        Returns a promise which resolves to true if the credientials expire.
 */
exports.expireCredentials = function(userId) {
  return
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
  // return Promise.resolve( userId );
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
exports.updateUser = function (userId, mws_auth_token, seller_id){
}


/**
 * addAuth - Returns a promise which resolves to the JWT. Not sure this will be used.
 *
 * @param  {Object}   params
 * @param  {integer}  params.user_id    description
 * @return  {Object}  JWT               description
 * @return  {string}  JWT.strategy   description
 * @return  {integer} JWT.expiration description
 * @return  {string}  JWT.authToken  description
 */

exports.addAuth = function (user_id, strategy, expiration, authToken) {
  return
}
