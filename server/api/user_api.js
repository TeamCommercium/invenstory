var express = require('express')
var User = require('../models/user_model.js')
var log = require('../modules/utilities.js').log;
var bodyParser = require('body-parser')


var router = express.Router()

.use(bodyParser.json())
/**
 *  @api {get}  /user/me  Check User Authentication
 *
 *  @apiName GetUserStatus
 *  @apiGroup user
 *  @apiUse restricted
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
 *
 *  @apiSuccess {Object}  user                User info
 *  @apiSuccess {string}  user.amzn_username  Amazon username
 *  @apiSuccess {string}  user.amzn_email     Amazon email
 *  @apiSuccess {string}  user.amzn_zip       Amazon zipcode "XXXXX-XXXX"
 *
 *  @apiDescription Endpoint to pull a users information. The server will lookup current users information.
 *
 *  @apiError (400 Bad Request) Request must a registered user.
 */
.get('/about', function(req, res) {
  User.getUserProfileInfo(req.user.id)
    .then(function(result){
      log('user_api succesful /user/about', result)
      res.status(200).send(result)
    })
    .catch(function(err) {
      log('error in getting user profile ', err)
      res.status(400).send('Bad Request')
    })
})

.post('/update', function(req, res) {
  params = req.body
  User.updateUserInfo(req.user.id, params)
    .then(function(result){
      log('update user result ',result)
      res.status(200).send(result)
    })
    .catch(function(err) {
      log('error in getting user profile ', err)
      res.status(400).send('Bad Request')
    })
})


module.exports = router
