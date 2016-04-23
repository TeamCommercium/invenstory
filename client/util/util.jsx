import { push } from 'react-router-redux'
import { store } from '../store/initStore'

/*
  Used mainly for redirects so far.
  
  redirect and hardRedirect take a URL as a parameter
  and return a function that will redirect to the given address when invoked.


  hardRedirect will change the real address of the site while redirect will do
  client side routing and interacts with the store.
 */


export function redirect(address){
  return function (address){
    store.dispatch(push(address))
  }.bind(null, address)
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
      if (response.status <= 400) {
        

        // var formattedData = {}
        // var responsething = {} //just to avoid fatal errors

        //  formattedData = responsething.id = "sampleId"
        //  formattedData.quantity = responsething.quantity = 4
        //  formattedData.purchasePrice = responsething.purchase_price = 43.34 
        //  formattedData = responsething.amzn_title = 'Bluetooth speakers'
        //  formattedData = responsething.amzn_description = 'Like speakers but Bluetooth'
        //  formattedData = responsething.amzn_price_fbm = 43.013
        //  formattedData = responsething.amzn_price_fba = 43.65
        //  formattedData = responsething.amzn_rank = 4300
        //  formattedData = responsething.amzn_weight = 1.2
        //  formattedData = responsething.amzn_manuf = 'Bose'
        //  formattedData = responsething.amzn_price_time = Date.now
      }
    })
}
