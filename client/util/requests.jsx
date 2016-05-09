import fetch from 'isomorphic-fetch'

import { store } from '../store/initStore'
import { smartDispatch } from '../dispatcher'
import { redirect, processNewData } from './util'
import { UPDATE_LAST_CHANGED, UPDATE_NOTIFICATIONS, UPDATE_INVENTORY, UPDATE_DETAIL_DATA, UPDATE_GRAPH_DATA, UPDATE_TABLE_DATA, UPDATE_AUTHENTICATION } from '../actionTypes'

export function searchAmazonForASIN(searchString){

  return fetch(`/products/search?q=${searchString}`,
    {
      credentials: 'include',
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
  .then(function(response){
    return response.json()
  })
  .catch(function(err){
    console.log("searchAmazonForASIN error:", err)
  })
}


/*
  function getHistoricalData:
 */

export function getHistoricalData(productId){

  return fetch(`/products/list?product_id=${productId}`,
    {
      credentials: 'include',
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
  .then(function(response){
    return response.json()
  })
  .catch(function(err){
    console.log("getHistoricalData error:", err)
  })
}



export function deleteInventoryItem(params){

  fetch('/inventory/delete',
    {
      credentials: 'include',
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }
  )
  .then(function(){
    setTimeout(processNewInventory, 1000);
  })
  .catch(function(err){
    console.log("Error deleting inventory", err)
  })
}

 
export function shipInventoryItems(params){

  fetch('/inventory/ship',
    {
      credentials: 'include',
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }
  )
  .then(function(){
    console.log("no error from ship inventory")
    setTimeout(processNewInventory, 1000);
  })
  .catch(function(err){
    console.log("adding inventory", err)
  })
}



/*
  function logout:
  Takes no parameters
  return nothing
  Api request that deletes the users cookie and redirects to login page
 */

export function logout() {

  fetch('/auth/logout', {credentials: 'include'})
    .then(function(response){
      smartDispatch(UPDATE_AUTHENTICATION, false)
      redirect("/#/login")()
      console.log("Logged out")
    })
    .catch(function(error){
      console.log("Error Logging Out: ", error)
    })
}

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


  fetch('/user/me', {credentials: 'include'})
  .then(function(response) {
    if(response.status >= 400){
      redirect("/#/login")()
    } else {
      smartDispatch(UPDATE_AUTHENTICATION, true)
    }
  })
}


/*
  function addUserInventory
  Takes 1 parameter. Its an object that should have all the properties expected by inventory_api /add
 */

 export function addUserInventory(params){

  fetch('/inventory/add',
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
  .then(function(){
    setTimeout(processNewInventory, 1000);
  })
  .catch(function(err){
    console.log("adding inventory", err)
  })
}


/*
  function getUserInventoryList:
  Takes no parameters
  return nothing
  Fetches the current user's inventory from the server's database
   and updates the store with new inventory data.
 */

//Get new data on launch
processNewInventory()

// Every hour check the database for data updates from Amazon
setInterval(processNewInventory, 30*60*1000);
export function processNewInventory(){

  fetch('/products/list', {credentials: 'include'})
    .then(function(response) {
      if(response.status >= 400) redirect("/#/login")()

      return response.json()
    })
    .then(function(data){
      processNewData(data)
    })
}

