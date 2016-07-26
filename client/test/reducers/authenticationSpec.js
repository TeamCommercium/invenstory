/* eslint-disable */
import { expect } from 'chai'
import { spy } from 'sinon'
import reducer from '../../reducers/authentication'
import initialState from '../../store/initialState'
import * as actions from '../../actionTypes'
import { store } from '../../store/initStore'

describe('Client: reducers/authentication.jsx', function () {
  it('function reducer should exist', function () {
    expect(reducer).to.exist;
  });

  it('function reducer should return original state if action isn\'t recognized', function () {
    expect(reducer(undefined, {type:""})).to.deep.equal(initialState.authenticated)
  });

  it('function reducer should update the store', function () {

    let initialStateWithNewTab = Object.create(initialState)
    initialStateWithNewTab.authenticated = 1

    expect(reducer(initialState, {type: actions.UPDATE_AUTHENTICATION, data: 1})).to.deep.equal(1)
    store.dispatch({type: actions.UPDATE_AUTHENTICATION, data: 1})
    expect(store.getState()).to.contain(initialStateWithNewTab)
    
    //reset
    store.dispatch({type: actions.UPDATE_AUTHENTICATION, data: initialState.authenticated})
  });
});
