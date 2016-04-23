var express = require('express')
var jwt_config = require('../modules/config.js').jwtConfig
var expressJWT = require('express-jwt')
var passport = require('passport')

var authenticate = expressJWT({secret: jwt_config.secret})

var router = express.Router()

.use(passport.initialize())

.get('/me', authenticate, function(req, res) {
  res.status(200).json(req.user)
})

module.exports = router