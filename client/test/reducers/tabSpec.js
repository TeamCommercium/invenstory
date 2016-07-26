/* eslint-disable */
import { expect } from 'chai'
import { spy } from 'sinon'
import reducer from '../../reducers/tab'
import initialState from '../../store/initialState'
import * as actions from '../../actionTypes'
import { store } from '../../store/initStore'

describe('Client: reducers/tab.jsx', function () {
  it('function reducer should exist', function () {
    expect(reducer).to.exist;
  });

  it('function reducer should return original state if action isn\'t recognized', function () {
    expect(reducer(undefined, {type:""})).to.deep.equal(initialState.tab)
  });

  it('function reducer should update the store', function () {

    let initialStateWithNewTab = Object.create(initialState)
    initialStateWithNewTab.tab = 1

    expect(reducer(initialState, {type: actions.CHANGE_TAB, data: 1})).to.deep.equal(1)
    store.dispatch({type: actions.CHANGE_TAB, data: 1})
    expect(store.getState()).to.contain(initialStateWithNewTab)
    
    //reset
    store.dispatch({type: actions.CHANGE_TAB, data: 0})
  });
});
