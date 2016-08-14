/* eslint-disable */
import { expect } from 'chai'
import { spy } from 'sinon'
import { store } from '../../store/initStore'
import initialState from '../../store/initialState'


xdescribe('Client: store/store.subscribeTo.jsx', function () {

  it('function store.subscribeTo should exist', function () {
    expect(store.subscribeTo).to.exist;
    expect(typeof store.subscribeTo).to.equal("function")
  });
  // could test each description
  it('function store.subscribeTo should call the callback provided when the changed property matches', function () {
   
    let normalSubscribeSpy = spy();
    let fancySubscribeSpy = spy();

    store.subscribe(normalSubscribeSpy)
    store.subscribeTo("tab", fancySubscribeSpy)

    expect(normalSubscribeSpy.callCount).to.equal(0)
    expect(fancySubscribeSpy.callCount).to.equal(0)
    store.dispatch({type: "UPDATE_LAST_CHANGED", data: "CHANGE_TAB"})
    store.dispatch({type: "CHANGE_TAB", data: 0})
    expect(normalSubscribeSpy.callCount).to.equal(2)

    // Changing "last changed" counts as an update
    expect(fancySubscribeSpy.callCount).to.equal(2)
  });

  it('function store.subscribeTo should not call the callback provided when the changed property doesn\'t match', function () {
  
    let normalSubscribeSpy = spy();
    let fancySubscribeSpy = spy();

    store.subscribe(normalSubscribeSpy)
    store.subscribeTo("tab", fancySubscribeSpy)

    store.dispatch({type: "UPDATE_LAST_CHANGED", data: "CHANGE_TAB"})
    store.dispatch({type: "CHANGE_TAB", data: 0})
    expect(normalSubscribeSpy.callCount).to.equal(2)

    // Changing "last changed" counts as an update
    expect(fancySubscribeSpy.callCount).to.equal(2)

    store.dispatch({type: "UPDATE_LAST_CHANGED", data: "UPDATE_NOTIFICATIONS"})
    store.dispatch({type: "CHANGE_TAB", data: 0})
    store.dispatch({type: "UPDATE_NOTIFICATIONS", data: 0})
    store.dispatch({type: "UPDATE_DETAIL_DATA", data: 0})
    store.dispatch({type: "UPDATE_TABLE_DATA", data: 0})
    store.dispatch({type: "UPDATE_GRAPH_DATA", data: 0})
    store.dispatch({type: "UPDATE_AUTHENTICATION", data: 0})

    expect(normalSubscribeSpy.callCount).to.equal(9)
    expect(fancySubscribeSpy.callCount).to.equal(2)

    //reset
    store.dispatch({type: "UPDATE_LAST_CHANGED", data: initialState.lastChanged})
    store.dispatch({type: "CHANGE_TAB", data: initialState.tab})
    store.dispatch({type: "UPDATE_NOTIFICATIONS", data: initialState.notifications})
    store.dispatch({type: "UPDATE_DETAIL_DATA", data: initialState.detail})
    store.dispatch({type: "UPDATE_TABLE_DATA", data: initialState.tableData})
    store.dispatch({type: "UPDATE_GRAPH_DATA", data: initialState.graphData})
    store.dispatch({type: "UPDATE_AUTHENTICATION", data: initialState.authenticated})
  });
});


