import { push } from 'react-router-redux'

import { store } from '../store/initStore'
import { UPDATE_INVENTORY } from '../actions'

/*
  Used mainly for redirects so far.
  
  redirect and hardRedirect take a URL as a parameter
  and return a function that will redirect to the given address when invoked.


  hardRedirect will change the real address of the site while redirect will do
  client side routing and interacts with the store.
 */

// subscribeTo("test", logger.bind(null, "for test"))
// subscribeTo("inventory", logger.bind(null, "for inventory"))

store.subscribe(logger)

store.dispatch({type: 'TEST'})
store.dispatch({type: UPDATE_INVENTORY, inventory: "this is inventory"})



function logger(){
  console.log("|||| loggy thing => new state", store.getState());
}

export function redirect(address){
  return function (address){
    store.dispatch(push(address))
  }.bind(null, address)
}

export function subscribeTo(property, callback){
  store.subscribe(function(){
    let tempState = store.getState()
    console.log("tempState.lastChanged", tempState.lastChanged)
  })
}
export function hardRedirect(address){
  return function (address){
    window.location.href = address
  }.bind(null, address)
}


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
