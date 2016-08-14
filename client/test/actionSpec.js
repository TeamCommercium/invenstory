/* eslint-disable */
import { expect } from 'chai'
import * as types from '../actionTypes'

describe('Client: actionTypes.jsx', function () {

  it('UPDATE_GRAPH_DATA should exist', function () {
    expect(types.UPDATE_GRAPH_DATA).to.exist;
  });

  it('UPDATE_GRAPH_DATA should have a predictable value', function () {
    expect(types.UPDATE_GRAPH_DATA).to.equal('UPDATE_GRAPH_DATA');
  });
    it('UPDATE_TABLE_DATA should exist', function () {
    expect(types.UPDATE_TABLE_DATA).to.exist;
  });

  it('UPDATE_TABLE_DATA should have a predictable value', function () {
    expect(types.UPDATE_TABLE_DATA).to.equal('UPDATE_TABLE_DATA');
  });

  it('UPDATE_LAST_CHANGED should exist', function () {
    expect(types.UPDATE_LAST_CHANGED).to.exist;
  });

  it('UPDATE_LAST_CHANGED should have a predictable value', function () {
    expect(types.UPDATE_LAST_CHANGED).to.equal('UPDATE_LAST_CHANGED');
  });

  it('UPDATE_AUTHENTICATION should exist', function () {
    expect(types.UPDATE_AUTHENTICATION).to.exist;
  });

  it('UPDATE_AUTHENTICATION should have a predictable value', function () {
    expect(types.UPDATE_AUTHENTICATION).to.equal('UPDATE_AUTHENTICATION');
  });

  it('UPDATE_NOTIFICATIONS should exist', function () {
    expect(types.UPDATE_NOTIFICATIONS).to.exist;
  });

  it('UPDATE_NOTIFICATIONS should have a predictable value', function () {
    expect(types.UPDATE_NOTIFICATIONS).to.equal('UPDATE_NOTIFICATIONS');
  });

  it('CHANGE_TAB should exist', function () {
    expect(types.CHANGE_TAB).to.exist;
  });

  it('CHANGE_TAB should have a predictable value', function () {
    expect(types.CHANGE_TAB).to.equal('CHANGE_TAB');
  });

  it('UPDATE_DETAIL_DATA should exist', function () {
    expect(types.UPDATE_DETAIL_DATA).to.exist;
  });

  it('UPDATE_DETAIL_DATA should have a predictable value', function () {
    expect(types.UPDATE_DETAIL_DATA).to.equal('UPDATE_DETAIL_DATA');
  });
});
