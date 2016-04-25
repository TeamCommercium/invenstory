var express = require('express')
var jwt_config = require('../modules/config.js').jwtConfig
var expressJWT = require('express-jwt')
var passport = require('passport')

/**
 * authenticate - Authenticate middleware to decode jwt and place user in req.user
 * 
 * @param  {Obj}    req     The request, with attached cookie
 * @return {token}  token   Token is decoded and placed in req.user
 */
var authenticate = expressJWT({
  secret: jwt_config.secret,
  getToken: function(req) {
    if( req.cookies && req.cookies.Token) {
      return req.cookies.Token
    } else {
      return null
    }
  }
})

var router = express.Router()

.use(passport.initialize())

.get('/me', authenticate, function(req, res) {
  res.sendStatus(200)
})

module.exports = router