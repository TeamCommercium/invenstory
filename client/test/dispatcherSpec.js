import { expect } from 'chai'
import { spy } from 'sinon'
import * as types from '../actionTypes'
import { smartDispatch } from '../dispatcher'
import { subscribeTo } from '../util/util'
import initialState from '../store/initialState'
import { store } from '../store/initStore'

describe('Client: actionTypes.jsx', function () {

  it('smartDispatch should exist and be a function', function () {
    expect(smartDispatch).to.exist;
    expect(typeof smartDispatch).to.equal('function');
  });

  it('smartDispatch should throw an error when given an invalid type', function () {
    expect(smartDispatch.bind(null, "TESTFALSEACTION")).to.throw(Error)
  });

  it('smartDispatch should not throw an error when given an invalid type', function () {
    expect(smartDispatch.bind(null, "CHANGE_TAB", 0)).to.not.throw(Error)
  });

  it('smartDispatch should trigger the correct subscriptions', function () {

    let dumbSpy = spy()
    let innactiveSpy = spy()
    let activeSpy = spy()
    store.subscribe(dumbSpy)
    subscribeTo('tab', activeSpy)
    subscribeTo('detail', innactiveSpy)

    expect(dumbSpy.callCount).to.equal(0)
    expect(innactiveSpy.callCount).to.equal(0)
    expect(activeSpy.callCount).to.equal(0)
    smartDispatch(types.CHANGE_TAB, "hi")
    expect(dumbSpy.callCount).to.equal(2)
    expect(innactiveSpy.callCount).to.equal(0)
    expect(activeSpy.callCount).to.equal(2)
    //reset
    store.dispatch({type: types.CHANGE_TAB, data: initialState.tab })
    store.dispatch({type: types.UPDATE_LAST_CHANGED, data: initialState.lastChanged})
  });
});
