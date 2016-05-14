const express = require('express')
const passport = require('passport')
const JWT = require('jsonwebtoken')
const AmazonStrategy = require('passport-amazon').Strategy
const amazonAuth_config = require('../modules/config').amazonAuth
const jwt_config = require('../modules/config').jwtConfig
const User = require('../models/user_model')
const log = require('../modules/utilities').log
const webConfig = require('../modules/config').webServer


passport.use(new AmazonStrategy({
    clientID: amazonAuth_config.clientId,
    clientSecret: amazonAuth_config.clientSecret,
    callbackURL: amazonAuth_config.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    const userObj = {
      amazon_id: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value,
      zipcode: profile._json.postal_code,
      amazon_accessToken: 'accessToken',
      amazon_refreshToken: 'refreshToken'
    }
    return done(null, userObj)
  }
))

const router = express.Router()
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
    res.redirect(amazonAuth_config.redirectURL)
})


 /**
  * @api {get} /auth/logout Logout
  * @apiName Logout
  * @apiGroup Auth
  * @apiUse restricted
  * @apiPermission user
  *
  * @apiDescription Endpoint clears the cookie with auth token.
  */
 .get('/logout', function(req, res) {
      res.clearCookie('Token')
      res.status(200).send('User Logged Out')
    }
  )


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
    User.findOrCreateUser(req.user)
    .then(result =>  {
      log('Serializing user', result)
      const id = result.id
      req.user = {id: id}
      next()})
    }

    function generateToken(req, res, next) {
      req.token = JWT.sign({
        id: req.user.id
      }, jwt_config.secret, {
        expiresIn: 3600
      })

      next()
    }

 module.exports = router
