var express = require('express')


var router = express.Router()


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


/**
 *  @api {get}  /user/about  Return User Info from database
 *
 *  @apiName GetUserInfo
 *  @apiGroup user
 *  @apiUse restricted
 *  @apiSuccess (200)
 *
 *  @apiDescription 
 *  
 */
.get('/about', function(req, res) {

})


module.exports = router