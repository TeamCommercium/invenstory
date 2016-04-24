import { expect } from 'chai'
import { spy } from 'sinon'
import { getUserInventoryList, redirect, subscribeTo } from '../../util/util'
    
var stuff = spy(redirect("/testing"))

describe('util.jsx', function () {
  it('function redirect should exist', function () {
    expect(redirect).to.exist;
  });

  it('function redirect should return a functin that hasn\'t been invoked', function () {
    expect(stuff.callCount).to.equal(0)
  });

  it('function redirect\'s result should throw a reference error on invocation due to lack of browser', function () {
    expect(stuff).to.throw(ReferenceError) //window not defined
  });

  it('function redirect\'s result should register that the function was invoked, despite the error', function () {
    expect(stuff.callCount).to.equal(1)
  });

  it('function getUserInventoryList should exist', function () {
    expect(getUserInventoryList).to.exist;
  });

  xit('function getUserInventoryList should exist', function () {
    expect(redirect).to.exist;
  });

});
