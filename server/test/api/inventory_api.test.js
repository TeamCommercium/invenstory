var supertest = require('supertest')
var expect = require('chai').expect
var should = require('chai').should
var amazonMWS = require('../../api/amazonMWS')

var express = require('express')
var app = express()


app.get('/getMatchingASIN', function(req, res) { 
  amazonMWS.getMatchingProductByAsin(testASIN)
  .then(function(result){
    res.json({result: result})
  })
})


var testServer = supertest("http://localhost:3000")

describe("Inventory API", function() {
  var server;

  beforeEach(function(){
    server = app.listen(3000)
  })

  afterEach(function(){
    server.close()
  })
  
  xit('Should do stuff', function(done){
    
  })

})