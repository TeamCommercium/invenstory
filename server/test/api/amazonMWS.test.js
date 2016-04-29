var supertest = require('supertest')
var expect = require('chai').expect
var should = require('chai').should
var amazonMWS = require('../../api/amazonMWS')

var express = require('express')
var app = express()

var testASIN = "B00UYNAGTI"

app.get('/getMatchingASIN', function(req, res) { 
  amazonMWS.getMatchingProductByAsin(testASIN)
  .then(function(result){
    res.json({result: result})
  })
})

//current amazon product response from getMatching ASINs #B00UYNAGTI
var response = [{"amzn_asin":"B00UYNAGTI","amzn_title":"LEGO Superheroes Marvel's Ant-Man 76039 Building Kit","amzn_description":"Swerve away from Yellowjacket's nail catapult. Super-jump to knock over Yellowjacket. Pick up Yellowjacket in the flying ant's pincers. Flying ant measures over 2\" (7cm) high, 9\" (25cm) long and 3\" (9cm) wide. LEGO brick-built catapult measures over 1\" (4cm) high, 2\" (7cm) wide and 2\" (6cm) deep","amzn_manufacturer":"LEGO","amzn_weight":0.5,"amzn_thumb_url":"http://ecx.images-amazon.com/images/I/61Gt0B2E7tL._SL75_.jpg","amzn_list_price":19.99,"amzn_sales_rank":16203}]

var testServer = supertest("http://localhost:3000")

describe("Amazon MWS API", function() {
  var server;

  beforeEach(function(){
    server = app.listen(3000)
  })

  afterEach(function(){
    server.close()
  })
  
  it('Should get product info based on ASIN', function(done){
    this.timeout(5000);
    testServer
      .get("/getMatchingASIN")

      .expect(200, done)
  })

  it('Should work without my silly server', function(done){
    var result = amazonMWS.getMatchingProductByAsin(testASIN)
    result
      .then(function(res) { expect(res).to.equal(1) })
      .then(done, done)

  })
})

