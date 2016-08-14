/* eslint-disable */
import { expect } from 'chai'
import { spy } from 'sinon'
import { store } from '../../store/initStore'
import initialState from '../../store/initialState'

xdescribe('Client: store/initStore.jsx', function () {
  it('should export an object named store', function () {
    expect(store).to.exist;
    expect(typeof store).to.equal("object")
  });

  it('Should be have a method called getState', function () {
    expect(store.getState).to.exist
  });

  it('Should be have a method called dispatch', function () {
    expect(store.dispatch).to.exist
  });

  it('Should be have a method called subscribe', function () {
    expect(store.subscribe).to.exist
  });

  it('getState should inherit properties from the initialState', function () {
    expect(store.getState()).to.contain(initialState)
  });
});
