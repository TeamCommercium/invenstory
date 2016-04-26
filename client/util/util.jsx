import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import { store } from '../store/initStore'
import { smartDispatch } from '../dispatcher'
import { UPDATE_LAST_CHANGED, UPDATE_INVENTORY, UPDATE_GRAPH_DATA, UPDATE_TABLE_DATA, UPDATE_AUTHENTICATION } from '../actionTypes'

// Used to test dispatching actions
// setTimeout( function(){
//   subscribeTo("tableData", function(){console.log("tableData TRIGGERED", Date.now())})
//   subscribeTo("graphData", function(){console.log("graphData TRIGGERED", Date.now())})
// },100)

// setTimeout( function(){
//   smartDispatch(UPDATE_INVENTORY, null)
// }, 2000);

// setTimeout( function(){
//   smartDispatch(UPDATE_TABLE_DATA, null)
// }, 4000);

// setTimeout( function(){
//   smartDispatch(UPDATE_GRAPH_DATA, null)
// }, 8000);

// setTimeout( function(){
//   smartDispatch(UPDATE_AUTHENTICATION, null)
// }, 10000);




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
  function addUserInventory
  Takes 1 parameter. Its an object that should have all the properties expected by inventory_api /add
 */

 export function addUserInventory(params){

   fetch('http://127.0.0.1:8080/inventory/add',
     {
       credentials: 'include',
       method: "POST",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(params)
     }
   )
   .then(function(response) {
     console.log(response)
   })
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
  if(property !== "authenticated" && property !== "inventory" && property !== "graphData" && property !== "tableData")
    throw new Error(`You tried to subscribe to ${property} but you may have meant 'authenticated', 'inventory', 'graphData', or 'tableData'`)

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
processNewInventory()
export function processNewInventory(){

//get data, process it, send to store
  fetch('http://127.0.0.1:8080/products/list', {credentials: 'include'})
    .then(function(response) {
      if(response.status >= 400) redirect("/#/login")()
      return response.json()
    })
    .then(function(data){

      console.log("arguments", data)

      processRawInventory(data)
      processGeneralGraphData(data)
      processGeneralTableData(data)
    })
}

/*
  function logout:
  Takes no parameters
  return nothing
  Api request that deletes the users cookie and redirects to login page
 */

export function logout() {
  fetch('http://127.0.0.1:8080/auth/logout', {credentials: 'include'})
    .then(function(response){
      smartDispatch(UPDATE_AUTHENTICATION, false)
      redirect("/#/login")()
    })
    .catch(function(error){
      console.log("Error Logging Out: ", error)
    })
}


function processRawInventory(inventory){

  smartDispatch(UPDATE_INVENTORY, inventory)
}

function processGeneralGraphData(inventory){
//  purchase price/amazon price * 100 = % profit

  let lineData = [{
    name: "Purchased at",
    values: inventory.map(function(cur, ind){
     return { y: cur.avg_purchase_price, x: ind }
    })
  },
  {
    name: "Selling at",
    values: inventory.map(function(cur, ind){
     return { y: cur.amzn_price_fba, x: ind }
    })
  }]

  // console.log(JSON.stringify(lineData))
  smartDispatch(UPDATE_GRAPH_DATA, lineData)
}

function processGeneralTableData(inventory){

  let tableData = inventory.map(function(cur){
    return {
      "Quantity": cur.quantity,
      "Purchase Price": cur.avg_purchase_price,
      "Title": cur.amzn_title,
      "Description": cur.amzn_description,
      "Amazon Price": cur.amzn_price_fba,
      "Merchant Price": cur.amzn_price_fbm,
      "Weight": cur.amzn_weight,
      "Manufacture": cur.amzn_manufacturer
    }
  })
  smartDispatch(UPDATE_TABLE_DATA, tableData)
}
