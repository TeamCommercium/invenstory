/* eslint-disable */
import { expect } from 'chai'
import { spy } from 'sinon'
import * as types from '../../actionTypes'
import initialState from '../../store/initialState'
import { store } from '../../store/initStore'

xdescribe('Client: dispatcher.jsx', function () {

  it('store.smartDispatch should exist and be a function', function () {
    expect(store.smartDispatch).to.exist;
    expect(typeof store.smartDispatch).to.equal('function');
  });

  it('store.smartDispatch should throw an error when given an invalid type', function () {
    expect(store.smartDispatch.bind(null, "TESTFALSEACTION")).to.throw(Error)
  });

  it('store.smartDispatch should not throw an error when given an invalid type', function () {
    expect(store.smartDispatch.bind(null, "CHANGE_TAB", 0)).to.not.throw(Error)
  });

  it('store.smartDispatch should trigger the correct subscriptions', function () {

    let dumbSpy = spy()
    let innactiveSpy = spy()
    let activeSpy = spy()
    store.subscribe(dumbSpy)
    store.subscribeTo('tab', activeSpy)
    store.subscribeTo('detail', innactiveSpy)

    expect(dumbSpy.callCount).to.equal(0)
    expect(innactiveSpy.callCount).to.equal(0)
    expect(activeSpy.callCount).to.equal(0)
    store.smartDispatch(types.CHANGE_TAB, "hi")
    expect(dumbSpy.callCount).to.equal(2)
    expect(innactiveSpy.callCount).to.equal(0)
    expect(activeSpy.callCount).to.equal(2)
    //reset
    store.dispatch({type: types.CHANGE_TAB, data: initialState.tab })
    store.dispatch({type: types.UPDATE_LAST_CHANGED, data: initialState.lastChanged})
  });
});
