var express = require('express')
var router = express.Router()

/**
 * @apiDefine restricted Restricted content
 *  Restricts access to authorized users.
 * @apiHeader (auth) {String} Authorization PassesJWT to auth header
 * @apiError (401 Unauthorized) err User not authenticated.
 */

 /**
  * @apiDefine public Public endpoints
  *  Endpoint may be accessed without credentials.
  */

/**
 * @api {get}  /auth/amazon Login
 * @apiName authAmazon
 * @apiGroup Auth
 * @apiDescription Endpoint to initiate Amazon authentication.
 * @apiUse public
 */
.get('/amazon', (req, res) => { res.status(200).send('hello world')})

module.exports = router ;
/**
 * @api {post} /auth/amazon/callback Amazon Oauth Callback
 * @apiName AmazonOauthCallback
 * @apiGroup Auth
 * @apiDescription Endpoint to initiate Amazon authentication. NOT SURE THIS IS RIGHT.
 * @apiUse public
 * @apiPermission none
 *
 * @apiSuccess (200) {Object} jwt Serialized JWT
 *
 */

 /**
  * @api {get} /logout Logout
  * @apiName Logout
  * @apiGroup Auth
  * @apiUse restricted
  * @apiPermission user
  *
  * @apiDescription Endpoint to cause user's credentials to expire.
  */
