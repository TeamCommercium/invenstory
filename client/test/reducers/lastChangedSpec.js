/* eslint-disable */
import { expect } from 'chai'
import { spy } from 'sinon'
import reducer from '../../reducers/lastChanged'
import initialState from '../../store/initialState'
import * as actions from '../../actionTypes'
import { store } from '../../store/initStore'

describe('Client: reducers/lastChanged.jsx', function () {
  it('function reducer should exist', function () {
    expect(reducer).to.exist;
  });

  it('function reducer should return original state if action isn\'t recognized', function () {
    expect(reducer(undefined, {type:""})).to.deep.equal(initialState.lastChanged)
  });

  it('function reducer should update the store', function () {

    let initialStateWithNewTab = Object.create(initialState)
    initialStateWithNewTab.lastChanged = 1

    expect(reducer(initialState, {type: actions.UPDATE_LAST_CHANGED, data: 1})).to.deep.equal(1)
    store.dispatch({type: actions.UPDATE_LAST_CHANGED, data: 1})
    expect(store.getState()).to.contain(initialStateWithNewTab)
    
    //reset
    store.dispatch({type: actions.UPDATE_LAST_CHANGED, data: initialState.lastChanged})
  });
});
