import { push } from 'react-router-redux'
import { store } from '../store/initStore'
import { smartDispatch } from '../dispatcher'
import { UPDATE_INVENTORY, UPDATE_AUTHENTICATION } from '../actionTypes'

// Used to test dispatching actions
setTimeout( function(){
  smartDispatch(UPDATE_INVENTORY, [{test: "test"}])
}, 3000);

setTimeout( function(){
  smartDispatch(UPDATE_AUTHENTICATION, true)
}, 6000);

setTimeout( function(){
  smartDispatch(UPDATE_INVENTORY, [{test: "test"}])
}, 9000);

subscribeTo("auth", function(){console.log("auth TRIGGERED")})
subscribeTo("inventory", function(){console.log("inventory TRIGGERED")})
/*
  function checkAuth
  Does not take any parameters
  Does not return anything

  If not authenticated, will redirect to the login page.

  Will check if authenticated by looking for it in the store and then if found to be false,
  will do an ajax call to check if they have logged in yet.
 */

export function checkAuth(){

  // smartDispatch(UPDATE_AUTHORIZATION, 
  if(store.getState().authenticated)
    return;

  fetch('http://localhost:8080/user/me')
  .then(function(response) {     
    response.status >= 400
     ? redirect("/#/login")()
     : smartDispatch(UPDATE_AUTHENTICATION, true)
  })
}


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
  if(property !== "auth" && property !== "inventory")
    throw new Error(`You tried to subscribe to ${property} but you may have meant 'auth' or 'inventory'`)


    let action = {
      inventory: {
        UPDATE_INVENTORY: true
      },
      auth: {
        UPDATE_AUTHENTICATION: true
      }
    }

  store.subscribe(function(){
    let tempState = store.getState()
    let changed = tempState.lastChanged
    if(action[property][changed]) 
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
      smartDispatch(UPDATE_INVENTORY, updatedInventory)
    })
}
