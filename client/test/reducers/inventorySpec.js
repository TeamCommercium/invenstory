import { expect } from 'chai'
import { spy } from 'sinon'
import reducer from '../../reducers/inventory'

describe('reducer.jsx', function () {
  it('function reducer should exist', function () {
    expect(reducer).to.exist;
  });

  it('function reducer should create a state and return it if none exists', function () {
    expect(reducer(undefined, {type:""})).to.deep.equal({ inventory: [], lastChanged: {} })
  });

  it('function reducer should have a case for UPDATE_INVENTORY that updates inventory', function () {
    expect(reducer(undefined, {type:"UPDATE_INVENTORY", inventory:"testingInventory"})).to.deep.equal({ inventory: "testingInventory", lastChanged: "INVENTORY" })
  });
});
