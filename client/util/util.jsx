import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import { store } from '../store/initStore'
import { smartDispatch } from '../dispatcher'
import { UPDATE_INVENTORY, UPDATE_AUTHENTICATION } from '../actionTypes'

// // Used to test dispatching actions
// subscribeTo("authenticated", function(){console.log("authenticated TRIGGERED", Date.now())})
// subscribeTo("inventory", function(){console.log("inventory TRIGGERED", Date.now())})

// setTimeout( function(){
//   smartDispatch(UPDATE_INVENTORY, [{test: "test"}])
// }, 3000);

// setTimeout( function(){
//   smartDispatch(UPDATE_AUTHENTICATION, true)
// }, 6000);

// setTimeout( function(){
//   smartDispatch(UPDATE_INVENTORY, [{test: "test"}])
// }, 9000);



/*
  function checkAuth
  Does not take any parameters
  Does not return anything

  If not authenticated, will redirect to the login page.

  Will check if authenticated by looking for it in the store and then if found to be false,
  will do an ajax call to check if they have logged in yet.
 */

export function checkAuth(){
  if(store.getState().authenticated)
    return;

  fetch('http://127.0.0.1:8080/user/me', {credentials: 'include'})
  .then(function(response) {     
    console.log(response)
    if(response.status >= 400){
      redirect("/#/login")()   
    } else {
      smartDispatch(UPDATE_AUTHENTICATION, true)
    }

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
  if(property !== "authenticated" && property !== "inventory")
    throw new Error(`You tried to subscribe to ${property} but you may have meant 'authenticated' or 'inventory'`)

    let action = {
      inventory: {
        UPDATE_INVENTORY: true
      },
      authenticated: {
        UPDATE_AUTHENTICATION: true
      },
      tableData: {
        UPDATE_TABLE_DATA: true
      },
      graphData: {
        UPDATE_GRAPH_DATA: true
      }
    }

  store.subscribe(function(){

    //Should probably add rate limiting to limit requests to be at least 3 milliseconds apart.

    let tempState = store.getState();
    let changed = tempState.lastChanged


    if(action[property][changed]) 
      callback(tempState)
  })
}


/*
  function getUserInventoryList:
  Takes no parameters
  return nothing
  Fetches the current user's inventory from the server's database
   and updates the store with new inventory data.
 */
export function processNewInventory(){

//get data, process it, send to store
  fetch('http://127.0.0.1:8080/inventory/list', {credentials: 'include'})
    .then(function(response) {
      return response.json()
    })
    .then(function(stuff){

      console.log("arguments", stuff)

      // processRawInventory(data)
      // processGeneralGraphData(data)
      // processGeneralTableData(data)
    })
}

function processRawInventory(inventory){

  smartDispatch(UPDATE_GRAPH_DATA, inventory)
}

function processGeneralGraphData(inventory){
//  purchase price/amazon price * 100 = % profit

  let lineData = [{
    name: "Purchased at",
    values: inventory.map(function(cur, ind){
     return {y: cur["Purchase Price"], x: ind}
    })
  },
  {
    name: "Selling at",
    values: inventory.map(function(cur, ind){
     return {y: cur["Amazon Price"], x: ind}
    })
  }]

  console.log(JSON.stringify(lineData))
  smartDispatch(UPDATE_GRAPH_DATA, lineData)
}

function processGeneralTableData(inventory){

  let tableData = inventory.map(function(cur){
    return {
      "Quantity": cur.quantity,
      "Purchase Price": cur.purchase_price,
      "Title": cur.amzn_title,
      "Description": cur.amzn_description,
      "Amazon Price": cur.amzn_price_fbm,
      "Merchant Price": cur.amzn_price_fba,
      "Weight": cur.amzn_weight,
      "Manufacture": cur.amzn_manuf
    }
  })
  smartDispatch(UPDATE_TABLE_DATA, tableData)
}
