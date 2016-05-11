import action from './propActions'

/*
  function subscribeTo
  Takes a string and a callback as parameters.
  Return's nothing.
  Wraps the store's subscribe method and only calls your callback when
  the most recentlychanged value matches the string you enterred as a property.

  This is intended to prevent unneeded re-renders by only triggering when relevant.
 */

export function subscribeTo(property, callback){
  let store = this;

  if( ! action[property])
    throw new Error(`You tried to subscribe to ${property} but you may have meant on of the following: detail, inventory, authenticated, tableData, notifications, graphData, tab`)
  
  store.subscribe(function(){

    let tempState = store.getState();
    let changed = tempState.lastChanged

    if(action[property][changed])
      callback(tempState)
  })
}
