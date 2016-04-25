import { push } from 'react-router-redux'

import { store } from '../store/initStore'
import { UPDATE_INVENTORY } from '../actions'

// Used to test dispatching actions
// setTimeout( function(){
//   store.dispatch({type: UPDATE_INVENTORY, inventory: "this is inventory"})
// }, 5000);

/*
  function redirect:
  Takes a URL as a parameter (relative or absolute)
  Takes an optional parameter for the window object (used for testing)

  return a function that will redirect to the given address when invoked
 */

export function redirect(address, _window = window){
  return function (address){
    _window.location.href = address
  }.bind(null, address)
}

/*
  function subscribeTo
  Takes a string and a callback as parameters.
  Return's nothing.
  Wraps the store's subscribe method and only calls your callback when 
  the most recentlychanged value matches the string you enterred as a property.

  This is intended to prevent unneeded re-renders by only triggering when relevant.
 */

export function subscribeTo(property, callback){
  store.subscribe(function(){
    let tempState = store.getState()
    if(tempState.lastChanged.lastChanged === property) 
      callback(tempState);
  })
}


/*
  function getUserInventoryList:
  Takes no parameters
  return nothing
  Fetches the current user's inventory from the server's database
   and updates the store with new inventory data.
 */
export function getUserInventoryList(){

//get data, process it, send to store
  fetch('http://localhost:8080/inventory/list')
    .then(function(response) {
      console.log("List response props", response)

      let updatedInventory = responseArrayTHING_REPLACEME.map(function(cur){
        return {
          quantity: cur.quantity,
          purchasePrice: cur.purchase_price,
          title: cur.amzn_title,
          description: cur.amzn_description,
          amazonPrice: cur.amzn_price_fbm,
          merchantPrice: cur.amzn_price_fba,
          weight: cur.amzn_weight,
          manufacture: cur.amzn_manuf
          // rank: cur.amzn_rank,
          // id: cur.id,
          // timestamp: cur.amzn_price_time
        }
      })
      store.dispatch({type: UPDATE_INVENTORY, inventory: updatedInventory})
    })
}
