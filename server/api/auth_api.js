var express = require('express')
var passport = require('passport')
var JWT = require('jsonwebtoken')
var AmazonStrategy = require('passport-amazon').Strategy
var amazonAuth_config = require('../modules/config.js').amazonAuth

passport.use(new AmazonStrategy({
  clientID: amazonAuth_config.clientId,
  clientSecret: amazonAuth_config.clientSecret,
  callbackURL: amazonAuth_config.callbackURL
}))

var router = express.Router()



.use(passport.initialize())

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

.get('/amazon', passport.authenticate('amazon', { scope: ['profile', 'postal_code'] , sessions: false}),
    function(res, res){
    }) 
})

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

.get('/amazon/callback', function(req, res, next){
  passport.authenticate('amazon', {sessions: false}, function(err, user, info){
    if (err) {
      console.log('amazon auth err: ', err)
      res.send(500)
    }


  })(req, res, next)
})

module.exports = router ;
 
 /**
  * @api {get} /logout Logout
  * @apiName Logout
  * @apiGroup Auth
  * @apiUse restricted
  * @apiPermission user
  *
  * @apiDescription Endpoint to cause user's credentials to expire.
  */
