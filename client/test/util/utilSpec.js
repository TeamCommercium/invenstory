import { expect } from 'chai'
import { spy } from 'sinon'
import { redirect, subscribeTo, processNewData, processRawInventory, processNotifications, processGeneralGraphData, processGeneralTableData } from '../../util/util'
    
let window = {
  location: {href: "testingHREF"}
};

let sampleData  = [{"id":1117,"amzn_title":"LEGO Superheroes Marvel's Ant-Man 76039 Building Kit","amzn_description":"Super-jump to knock over Yellowjacket","amzn_asin":"B00UYNAGTI","amzn_sales_rank":23423,"amzn_weight":0.5,"amzn_manufacturer":"LEGO","amzn_thumb_url":"http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg","amzn_price_fba":54.76,"amzn_price_fbm":49.99,"seller_sku":"76039","avg_purchase_price":22.41142857142857,"quantity":7},{"id":1118,"amzn_title":"LEGO Star Wars Super Star Destroyer 10221","amzn_description":"Includes Darth Vader, Admiral Piett, Dengar and Bossk minifigures and also includes IG-88 figure","amzn_asin":"B0050R0YB8","amzn_sales_rank":23423,"amzn_weight":16.4,"amzn_manufacturer":"LEGO","amzn_thumb_url":"http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg","amzn_price_fba":1298.95,"amzn_price_fbm":1001.99,"seller_sku":"10221","avg_purchase_price":432.99,"quantity":2},{"id":1119,"amzn_title":"LEGO Architecture Solomon R. Guggenheim Museum (21004)","amzn_description":"Replica of real-world architectural landmark Solomon R. Guggenheim museum","amzn_asin":"B002HFHFCC","amzn_sales_rank":23423,"amzn_weight":1,"amzn_manufacturer":"LEGO","amzn_thumb_url":"http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg","amzn_price_fba":169.95,"amzn_price_fbm":165.18,"seller_sku":"21004","avg_purchase_price":37.88,"quantity":4}]
let sampleRaw   = [{"id":1117,"amzn_title":"LEGO Superheroes Marvel's Ant-Man 76039 Building Kit","amzn_description":"Super-jump to knock over Yellowjacket","amzn_asin":"B00UYNAGTI","amzn_sales_rank":23423,"amzn_weight":0.5,"amzn_manufacturer":"LEGO","amzn_thumb_url":"http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg","amzn_price_fba":54.76,"amzn_price_fbm":49.99,"seller_sku":"76039","avg_purchase_price":22.41142857142857,"quantity":7,"profit":144},{"id":1118,"amzn_title":"LEGO Star Wars Super Star Destroyer 10221","amzn_description":"Includes Darth Vader, Admiral Piett, Dengar and Bossk minifigures and also includes IG-88 figure","amzn_asin":"B0050R0YB8","amzn_sales_rank":23423,"amzn_weight":16.4,"amzn_manufacturer":"LEGO","amzn_thumb_url":"http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg","amzn_price_fba":1298.95,"amzn_price_fbm":1001.99,"seller_sku":"10221","avg_purchase_price":432.99,"quantity":2,"profit":200},{"id":1119,"amzn_title":"LEGO Architecture Solomon R. Guggenheim Museum (21004)","amzn_description":"Replica of real-world architectural landmark Solomon R. Guggenheim museum","amzn_asin":"B002HFHFCC","amzn_sales_rank":23423,"amzn_weight":1,"amzn_manufacturer":"LEGO","amzn_thumb_url":"http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg","amzn_price_fba":169.95,"amzn_price_fbm":165.18,"seller_sku":"21004","avg_purchase_price":37.88,"quantity":4,"profit":349}]
let sampleGraph = [["SKU","Cost",{"type":"string","role":"tooltip"},"Current Value",{"type":"string","role":"tooltip"}],["76039",22.41,"LEGO Superheroes Marvel's Ant-Man 7, QTY:7 COST: $22.41 TOT COST: $156.88",54.76,"LEGO Superheroes Marvel's Ant-Man 7, CUR VAL: $54.76 TOT VAL: $383.32 GAIN: 244%"],["10221",432.99,"LEGO Star Wars Super Star Destroyer, QTY:2 COST: $432.99 TOT COST: $865.98",1298.95,"LEGO Star Wars Super Star Destroyer, CUR VAL: $1298.95 TOT VAL: $2597.90 GAIN: 300%"],["21004",37.88,"LEGO Architecture Solomon R. Guggen, QTY:4 COST: $37.88 TOT COST: $151.52",169.95,"LEGO Architecture Solomon R. Guggen, CUR VAL: $169.95 TOT VAL: $679.80 GAIN: 449%"]]
let sampleTable = [{"":{"type":"img","key":null,"ref":null,"props":{"src":"http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg","style":{"width":50,"height":50,"padding":0,"margin":0}},"_owner":null,"_store":{}},"SKU":"76039","ASIN":"B00UYNAGTI","Title":"LEGO Superheroes Marvel's Ant-Man 7...","QTY":7,"Cost":22.41,"FBM Price":49.99,"FBA Price":54.76,"Tot Value":383.32,"% Gain":244,"Details":{"type":"button","key":null,"ref":null,"props":{"children":" View Details "},"_owner":null,"_store":{}}},{"":{"type":"img","key":null,"ref":null,"props":{"src":"http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg","style":{"width":50,"height":50,"padding":0,"margin":0}},"_owner":null,"_store":{}},"SKU":"10221","ASIN":"B0050R0YB8","Title":"LEGO Star Wars Super Star Destroyer...","QTY":2,"Cost":432.99,"FBM Price":1001.99,"FBA Price":1298.95,"Tot Value":2597.9,"% Gain":300,"Details":{"type":"button","key":null,"ref":null,"props":{"children":" View Details "},"_owner":null,"_store":{}}},{"":{"type":"img","key":null,"ref":null,"props":{"src":"http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg","style":{"width":50,"height":50,"padding":0,"margin":0}},"_owner":null,"_store":{}},"SKU":"21004","ASIN":"B002HFHFCC","Title":"LEGO Architecture Solomon R. Guggen...","QTY":4,"Cost":37.88,"FBM Price":165.18,"FBA Price":169.95,"Tot Value":679.8,"% Gain":449,"Details":{"type":"button","key":null,"ref":null,"props":{"children":" View Details "},"_owner":null,"_store":{}}}]
let sampleNotif = [{"id":1119,"amzn_title":"LEGO Architecture Solomon R. Guggenheim Museum (21004)","amzn_description":"Replica of real-world architectural landmark Solomon R. Guggenheim museum","amzn_asin":"B002HFHFCC","amzn_sales_rank":23423,"amzn_weight":1,"amzn_manufacturer":"LEGO","amzn_thumb_url":"http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg","amzn_price_fba":169.95,"amzn_price_fbm":165.18,"seller_sku":"21004","avg_purchase_price":37.88,"quantity":4,"profit":349},{"id":1118,"amzn_title":"LEGO Star Wars Super Star Destroyer 10221","amzn_description":"Includes Darth Vader, Admiral Piett, Dengar and Bossk minifigures and also includes IG-88 figure","amzn_asin":"B0050R0YB8","amzn_sales_rank":23423,"amzn_weight":16.4,"amzn_manufacturer":"LEGO","amzn_thumb_url":"http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg","amzn_price_fba":1298.95,"amzn_price_fbm":1001.99,"seller_sku":"10221","avg_purchase_price":432.99,"quantity":2,"profit":200}]

let redirectSpy = spy(redirect("/testing", window))

describe('Client: util/util.jsx', function () {
  it('function redirect should exist', function () {
    expect(redirect).to.exist;
    expect(typeof redirect).to.equal("function")
  });

  it('function redirect should return a functin that hasn\'t been invoked', function () {
    expect(redirectSpy.callCount).to.equal(0)
  });

  it('function redirect\'s result should change the value of window.location.href when invoked', function () {
    expect(window.location.href).to.equal("testingHREF")
    expect(redirectSpy).to.not.throw(ReferenceError)
    expect(window.location.href).to.equal("/testing")
  });

  it('function redirect\'s result should register that the function was invoked', function () {
    expect(redirectSpy.callCount).to.equal(1)
  });

  it('function subscribeTo should exist', function () {
    expect(subscribeTo).to.exist;
    expect(typeof subscribeTo).to.equal("function")
  });


  it('function processNewData should exist', function () {
    expect(processNewData).to.exist;
    expect(typeof processNewData).to.equal("function")
  });

  it('function processRawInventory should exist', function () {
    expect(processRawInventory(sampleData)).to.exist;
  });

  it('function processRawInventory should keep all data and add profit margin', function () {
    expect(processRawInventory(sampleData)).to.equal();
  });

  it('function processGeneralGraphData should exist', function () {
    expect(processGeneralGraphData).to.exist;
  });

  it('function processGeneralTableData should exist', function () {
    expect(processGeneralTableData).to.exist;
  });

  it('function processNotifications should exist', function () {
    expect(processNotifications).to.exist;
  });
});
