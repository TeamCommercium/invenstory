var express = require('express')
var passport = require('passport')
var JWT = require('jsonwebtoken')
var AmazonStrategy = require('passport-amazon').Strategy
var amazonAuth_config = require('../modules/config.js').amazonAuth
var jwt_config = require('../modules/config.js').jwtConfig
var User = require('../models/user_model.js')
var log = require('../modules/utilities.js').log

passport.use(new AmazonStrategy({
    clientID: amazonAuth_config.clientId,
    clientSecret: amazonAuth_config.clientSecret,
    callbackURL: amazonAuth_config.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var userObj = {
      amazon_id: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value,
      zipcode: profile._json.postal_code,
      amazon_accesToken: 'accessToken',
      amazon_refreshToken: 'refreshToken'
    }
    return done(null, userObj)
  }
))


/**
 * serialize - Express/Passport middleware serializes user data in request token. Relies on findOrCreateUser generator function.
 *
 * @private
 * @param  {Object} req  Express request object.
 * @param  {Object} res  Express response object
 * @param  {Function} next go to next middleware
 */
function serialize(req, res, next) {
  //change req.user to desired with db call
  // let getUserId = User.findOrCreateUser(req.user.amazon_id)
  // let userId = getUserId.next().value
  // log('Searched for user, result:', userId)
  // if (!userId[0]) getUserId.next().value
  // log('Searched for user, result:', userId)
  User.findOrCreateUser(req.user.amazon_id)
    .then(function(result) {
      req.user = {id: result.id}
      next()})
}

function generateToken(req, res, next) {
  //console.log('generate token ', req.user)
  req.token = JWT.sign({
      id: req.user.id
    }, jwt_config.secret, {
      expiresIn: 3600
    })

  next()
}

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

.get('/amazon', passport.authenticate('amazon', { scope: ['profile', 'postal_code'] , session: false}))


/**
 * @api {get} /auth/amazon/callback Amazon Oauth Callback
 * @apiName AmazonOauthCallback
 * @apiGroup Auth
 * @apiDescription Endpoint to initiate Amazon authentication. NOT SURE THIS IS RIGHT.
 * @apiUse public
 * @apiPermission none
 *
 * @apiSuccess (200) {Object} jwt Serialized JWT
 *
 */

.get('/amazon/callback',
  passport.authenticate('amazon', {session: false}),
  serialize,
  generateToken,
  function(req,res){
    res.cookie('Token', req.token)
    res.redirect('/')
})


 /**
  * @api {get} /auth/logout Logout
  * @apiName Logout
  * @apiGroup Auth
  * @apiUse restricted
  * @apiPermission user
  *
  * @apiDescription Endpoint to cause user's credentials to expire.
  */
 .get('/logout', function(req, res) {
      res.clearCookie('Token')
      res.status(200).send('User Logged Out')
    }
  )


 module.exports = router ;


