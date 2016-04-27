var supertest = require('supertest')
var expect = require('chai').expect
var should = require('chai').should

var express = require('express')

var app = express()


describe("Amazon MWS API", function() {
  var server;
  beforeEach(function(){
    delete require.cache[require.resolve('../server')]
    server = require('../server')
  })

  afterEach(function(done){
    server.close(done)
  })

  xit('not yet', function(){
    
  })
})

