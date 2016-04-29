import React from 'react'
import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import { store } from '../store/initStore'
import {unsafe} from 'reactable'

import { smartDispatch } from '../dispatcher'
import { UPDATE_LAST_CHANGED, UPDATE_INVENTORY, UPDATE_DETAIL_DATA, UPDATE_GRAPH_DATA, UPDATE_TABLE_DATA, UPDATE_AUTHENTICATION } from '../actionTypes'

// // Used to test dispatching actions
// setTimeout( function(){
//   subscribeTo("detail", function(stuff){console.log("detail TRIGGERED", stuff)})
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


  fetch('http://localhost:8080/user/me', {credentials: 'include'})
  .then(function(response) {
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

  fetch('http://localhost:8080/inventory/add',
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
  .catch(function(err){
    console.log("adding inventory", err)
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

  let action = {
    detail: {
      UPDATE_DETAIL_DATA: true
    },
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
    },
    tab: {
      CHANGE_TAB: true
    }
  }

  if( ! action[property])
    throw new Error(`You tried to subscribe to ${property} but you may have meant on of the following: detail, inventory, authenticated, tableData, graphData, tab`)

  store.subscribe(function(){

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

// setInterval(processNewInventory, 1000);
processNewInventory()
export function processNewInventory(){

//get data, process it, send to store

  fetch('http://localhost:8080/products/list', {credentials: 'include'})
    .then(function(response) {
      if(response.status >= 400) redirect("/#/login")()

      return response.json()
    })
    .then(function(data){
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

  fetch('http://localhost:8080/auth/logout', {credentials: 'include'})
    .then(function(response){
      smartDispatch(UPDATE_AUTHENTICATION, false)
      redirect("/#/login")()
      console.log("Logged out")
    })
    .catch(function(error){
      console.log("Error Logging Out: ", error)
    })
}


function processRawInventory(inventory){

  smartDispatch(UPDATE_INVENTORY, inventory)
}

function processGeneralGraphData(inventory){

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

  smartDispatch(UPDATE_GRAPH_DATA, lineData)
}

function processGeneralTableData(inventory){

  let tableData = inventory.map(function(cur){
    return {
      "Image": <img src={cur.amzn_thumb_url} style={{width: 50, height:50, padding:0, margin:0}} />,
      "SKU": cur.seller_sku,
      "ASIN": cur.amzn_asin,
      "Manufacturer": cur.amzn_manufacturer,
      "Title": cur.amzn_title && cur.amzn_title.slice(0,50) + "...",
      "Description": cur.amzn_description && cur.amzn_description.slice(0,40) + "...",
      "Qty": cur.quantity,
      "Purchase ($)": cur.avg_purchase_price && Math.round(cur.avg_purchase_price*100)/100,
      "Amazon ($)": cur.amzn_price_fba && Math.round(cur.amzn_price_fba*100)/100,
      "Profit (%)": cur.avg_purchase_price && cur.amzn_price_fba && Math.round((cur.amzn_price_fba - cur.avg_purchase_price) / cur.avg_purchase_price*10000)/100,
      "Add": <button onClick={smartDispatch.bind(null, UPDATE_DETAIL_DATA, cur)}> View Details </button>,
    }
  })
  smartDispatch(UPDATE_TABLE_DATA, tableData)
}
 