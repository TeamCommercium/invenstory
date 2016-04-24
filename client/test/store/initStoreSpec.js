import { expect } from 'chai'
import { spy } from 'sinon'
import { store } from '../../store/initStore'
import initialState from '../../store/initialState'

console.log(store)

describe('Client: store/initStore.jsx', function () {
  it('should export an object named store', function () {
    expect(store).to.exist;
    expect(typeof store).to.equal("object")
  });

  it('Should be have a method called getState', function () {
    expect(store.getState).to.exist
  });

  it('getState should inherit properties from the initialState', function () {
    expect(store.getState()).to.contain(initialState)
  });
});

