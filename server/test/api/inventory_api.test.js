ar supertest = require('supertest')
var expect = require('chai').expect
var should = require('chai').should
var amazonMWS = require('../../api/amazonMWS')

var express = require('express')
var app = express()


app.get('/getMatchingASIN', function(req, res) { 
  amazonMWS.getMatchingProductByAsin(testASIN)
  .then(function(result){
    console.log('test: ', result)
    res.json({result: result})
  })
})


var testServer = supertest("http://localhost:3000")

describe("Amazon MWS API", function() {
  var server;

  beforeEach(function(){
    console.log("in heree")
    server = app.listen(3000)
  })

  afterEach(function(){
    server.close()
  })
  
  xit('Should get product info based on ASIN', function(done){
    
  })

  xit('Should work without my silly server', function(done){
    
  })
})