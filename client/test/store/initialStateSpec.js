/* eslint-disable */
import { expect } from 'chai'
import { spy } from 'sinon'
import initialState from '../../store/initialState'

describe('Client: store/initialState.jsx', function () {
  it('should export an object', function () {
    expect(initialState).to.exist;
    expect(typeof initialState).to.equal("object")
  });

  it('Should be have a property for tableData that is an Array', function () {
    expect(initialState.tableData).to.exist
    expect(Array.isArray(initialState.tableData)).to.equal(true)
  });

  it('Should be have a property for graphData that is an Array', function () {
    expect(initialState.graphData).to.exist
    expect(Array.isArray(initialState.graphData)).to.equal(true)
  });

  it('Should be have a property for authenticated that is false', function () {
    expect(initialState.authenticated).to.exist
    expect(initialState.authenticated).to.equal(false)
  });

  it('Should be have a property for lastChanged that is null', function () {
    expect(initialState.lastChanged).to.equal(null)
  });

  it('Should be have a property for detail that is an Array', function () {
    expect(initialState.detail).to.deep.equal({})
  });

  it('Should be have a property for notifications that is null', function () {
    expect(initialState.notifications).to.deep.equal([])
  });

  it('Should be have a property for tab that is a number (0)', function () {
    expect(initialState.tab).to.exist
    expect(initialState.tab).to.equal(0)
  });
});
