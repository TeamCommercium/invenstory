import { expect } from 'chai'
import { spy } from 'sinon'
import initialState from '../../store/initialState'

describe('Client: store/initialState.jsx', function () {
  it('should export an object', function () {
    expect(initialState).to.exist;
    expect(typeof initialState).to.equal("object")
  });

  it('Should be have a property for inventory that is an Array', function () {
    expect(Array.isArray(initialState.inventory)).to.equal(true)
  });
});

