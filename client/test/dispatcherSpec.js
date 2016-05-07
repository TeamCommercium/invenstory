import { expect } from 'chai'
import { spy } from 'sinon'
import * as types from '../actionTypes'
import { smartDispatch} from '../dispatcher'
import { store } from '../store/initStore'

store.subscribe(spy)

describe('Client: actionTypes.jsx', function () {
  it('smartDispatch should exist and be a function', function () {
    expect(smartDispatch).to.exist;
    expect(typeof smartDispatch).to.equal('function');
  });

  it('smartDispatch should throw an error when given an invalid type', function () {
    expect(smartDispatch.bind(null, "TESTFALSEACTION")).to.throw(Error)
  });

  xit('smartDispatch should not throw an error when given an invalid type', function () {
    expect(smartDispatch.bind(null, types.UPDATE_INVENTORY )).to.not.throw(Error)
  });
});
