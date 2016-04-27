import { expect } from 'chai'
import { UPDATE_INVENTORY } from '../actionTypes'

describe('Client: actions.jsx', function () {
  it('UPDATE_INVENTORY should exist', function () {
    expect(UPDATE_INVENTORY).to.exist;
  });

  it('UPDATE_INVENTORY should have a predictable value', function () {
    expect(UPDATE_INVENTORY).to.equal('UPDATE_INVENTORY');
  });
});
