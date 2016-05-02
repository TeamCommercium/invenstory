import fetch from 'isomorphic-fetch'

import { store } from '../store/initStore'
import { smartDispatch } from '../dispatcher'
import { redirect, processNewData } from './util'
import { UPDATE_LAST_CHANGED, UPDATE_NOTIFICATIONS, UPDATE_INVENTORY, UPDATE_DETAIL_DATA, UPDATE_GRAPH_DATA, UPDATE_TABLE_DATA, UPDATE_AUTHENTICATION } from '../actionTypes'


/**
 * @api {delete} /inventory/delete Delete Inventory Listing
 * @apiName DeleteProduct
 * @apiGroup product
 * @apiUse restricted
 *
 * @apiParam {string} id Product listing id whose inventory should be deleted delete.
 * @apiError (404 Not found) err Not found.
 * @apiSuccessExample success-response:
 *  HTTP/1.1 204 OK
 *
 * @apiDescription Endpoint to allow user to delete all of their own inventory records for a product.
 */

 // .delete('/delete', function(req, res) {
 //  let params = req.body
 //  log("Web service request to delete inventory: ", params)
 //  Inventory.deleteInventory(params.id, req.user.id)
 //    .then(function(data) {
 //        res.status(200).send(data)
 //    })
 //    .catch(function(err) {
 //      log("An error occurred deleting inventory: ", err)
 //      res.status(400).send("Bad request")
 //    })
 // })
export function deleteInventoryItem(params){

  console.log("delete inventory", params)

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
    console.log("no error from delete inventory")
  })
  .catch(function(err){
    console.log("adding inventory", err)
  })
}

  /**
  * @api {put} /inventory/ship Set inventory status to shipped
  * @apiName UpdateProduct
  * @apiGroup product
  * @apiUse restricted
  *
  * @apiDescription Endpoint to allow user to mark user's inventory as shipped.
  *
  * @apiParam {Object} product Updated product to update.
  * @apiParam {string} product.id ID of product to update.
  * @apiParam {number} product.quantity quantity shipped.
  * @apiSuccess {Object} product Return updated product listing. See /api/product/list.
  */

  // .put('/ship', function(res, req) {
  //  let params = req.body
  //  log("Web service request to ship inventory: ", params)
  //  Inventory.shipInventory(params.id, req.user.id, params.quantity)
  //    .then(function(resp) {
  //       log('Shipped inventory', resp)
  //       Products.getProducts(req.user.id, params.id)
  //         .then( function(resp) {
  //           log('Retreived product after update')
  //           res.status(200).send(resp[0])
  //         })
  //    })
  //    .catch(function(err) {
  //      log("An error occurred shipping inventory: ", err)
  //      res.status(400).send("Bad request")
  //    })
  // })

export function shipInventoryItems(params){
  console.log("shipInventory", params)

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

processNewInventory()
// setInterval(processNewInventory, 2000);

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

