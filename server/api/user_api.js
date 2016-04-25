var express = require('express')
var jwt_config = require('../modules/config.js').jwtConfig
var expressJWT = require('express-jwt')
var passport = require('passport')
var authenticate = require('../modules/utilities.js').authenticate


var router = express.Router()

.use(passport.initialize())

/**
 *  @api {get}  /user/me  Check User Authentication
 *
 *  @apiName GetUserStatus
 *  @apiGroup user
 *  @apiUse restricted
 *  @apiSuccess (200)
 *
 *  @apiDescription Endpoint to verify the authorization status of user
 * 
 */

.get('/me', function(req, res) {
  res.sendStatus(200)
})


module.exports = router