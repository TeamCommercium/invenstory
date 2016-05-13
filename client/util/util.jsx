import React from 'react'
import { store } from '../store/initStore'
import * as actions from '../actionTypes'

/**
 * @function redirect
 * @param {string} address - URL to redirect to
 * @param {object} _window - Optional parameter for window object (used in testing)
 * @return a function that will redirect to the given address when invoked
 */

export function redirect(address, _window = window){
  return function (address){
    _window.location.href = address
  }.bind(null, address)
}

/**
 * Called whenever new data is recieved by requests: processNewInventory
 * All of the functions invoked within processNewData format the new data as needed and save it to the store.
 * function processNewData
 * @param  {Object[]} inventory - Inventory data from the server
 * @return {Object[]} Validated object with a new profit propery
 */

export function processNewData(data){
  //Each of these functions return something for testing purposes, but don't need to. 

  let withProfit = processRawInventory(data)
  
  processGeneralGraphData(withProfit)
  processPieChartData(withProfit)
  processGeneralTableData(withProfit)
  processNotifications(withProfit)
}

/**
 * @function processUserSettings 
 * @param  {Object} settings - Object with deeply nested properties.
 * @return {Object} formatted user settings
 */
export function processUserSettings(settings){
  return {
    username: settings.user.amzn_username,
    email: settings.user.amzn_email,
    zipcode: settings.user.amzn_zip
  }
}

/**
 * function processRawInventory
 * @param  {Object[]} inventory - Inventory data from the server
 * @return {Object[]} Validated object with a new profit propery
 */
export function processRawInventory(inventory){
  inventory = inventory.map(function(cur){
   cur.profit = cur.avg_purchase_price && cur.amzn_price_fba && Math.round((cur.amzn_price_fba - cur.avg_purchase_price) / cur.avg_purchase_price*100)
    Object.keys(cur).map(function(key){
      return (cur[key] === null || cur[key] === undefined)
       ? cur[key] = 0
       : cur[key]
    })
    return cur;
  })

  return inventory
}

/**
 * @function processNotifications
 * @param  {Object[]} inventory - Processed inventory that was returned by processRawInventory
 * @return {Object[]} Filtered by profit and sorted into descending order
 */
export function processNotifications(inventory){

  let notifications = inventory.filter(function(cur){
    return cur.profit > 150 //could build in setting here
  })
  .sort(function(a, b){
    return b.profit - a.profit
  })

  store.smartDispatch(actions.UPDATE_NOTIFICATIONS, notifications)
  return notifications
}

/**
 * A function that processes the inventory data to a format usable by the bar graph
 * @function processGeneralGraphData
 * @param  {Object[]} inventory - Processed inventory that was returned by processRawInventory
 * @return {Object[]} Formatted into data useful to Google Charts bar graph
 */
export function processGeneralGraphData(inventory){

  let lineData =  [['SKU', 'Cost', {type: 'string', role: 'tooltip'}, 'Current Value', {type: 'string', role: 'tooltip'}]]; 
  let priceData = inventory.forEach(function(cur, ind){
    const amznPrice = cur.amzn_price_fba || cur.amzn_price_fbm;
    lineData.push(
      [
        cur.seller_sku,
        Math.round(cur.avg_purchase_price*100) / 100,
        cur.amzn_title && cur.amzn_title.slice(0,35) + ", QTY:" + cur.quantity + " COST: $" + cur.avg_purchase_price.toFixed(2) + " TOT COST: $" + (cur.avg_purchase_price * cur.quantity).toFixed(2),
        Math.round(amznPrice * 100) / 100,
        cur.amzn_title && cur.amzn_title.slice(0,35) + ", CUR VAL: $" + amznPrice.toFixed(2) + " TOT VAL: $" + (amznPrice * cur.quantity).toFixed(2) + " GAIN: " + ((amznPrice - cur.avg_purchase_price) / cur.avg_purchase_price * 100).toFixed(0) + "%"
      ]
    )
  })
  store.smartDispatch(actions.UPDATE_GRAPH_DATA, lineData)
  return lineData
}

/**
 * A function that processes the inventory data to a format usable by the line graph
 * @function processPieChartData
 * @param  {Object[]} inventory - Processed inventory that was returned by processRawInventory
 * @return {Object[]} Formatted into data useful to Google Charts line graph
 */
export function processPieChartData(inventory){

  let totalValue = 0;
  let totalCost = 0;
  let lineData =  [['SKU', 'Cost', {type: 'string', role: 'tooltip'}]]; 
  let priceData = inventory.forEach(function(cur, ind){
    const amznPrice = cur.amzn_price_fba || cur.amzn_price_fbm;
    totalValue += amznPrice * cur.quantity;
    totalCost += cur.avg_purchase_price * cur.quantity;
    lineData.push(
      [
        cur.seller_sku + ", Quantity: " + cur.quantity + ", Total Value: $" + (amznPrice * cur.quantity).toFixed(2),
        Math.round(amznPrice * cur.quantity * 100) / 100,
        cur.amzn_title && cur.amzn_title.slice(0,55) + " - Total Value: $" + (amznPrice * cur.quantity).toFixed(2),
      ]
    )
  })
  store.smartDispatch(actions.UPDATE_PIECHART_DATA, lineData)
  return lineData
}

/**
 * A function that processes the inventory data to a format usable by the line graph
 * @function processGeneralTableData
 * @param  {Object[]} inventory - Processed inventory that was returned by processRawInventory
 * @return {Object[]} Formatted into data useful to reactable's table
 */
export function processGeneralTableData(inventory){
  let tableData = inventory.map(function(cur){
    return {
      " ": <img src={cur.amzn_thumb_url} style={{width: 50, height:50, padding:0, margin:0}} />,
      "SKU": cur.seller_sku,
      "ASIN": cur.amzn_asin,
      "Title": cur.amzn_title && (cur.amzn_title.slice(0,100)),
      "QTY": cur.quantity,
      "Cost": cur.avg_purchase_price && "$" + (Math.round(cur.avg_purchase_price * 100) / 100).toFixed(2),
      "FBM Price": cur.amzn_price_fbm && "$" + (Math.round(cur.amzn_price_fbm * 100) / 100).toFixed(2),
      "FBA Price": cur.amzn_price_fba && "$" + (Math.round(cur.amzn_price_fba * 100) / 100).toFixed(2),
      "Total Cost": "$" + (Math.round(cur.avg_purchase_price * cur.quantity * 100) / 100).toFixed(2),
      "Total Value": cur.amzn_price_fba ? "$" + (Math.round(cur.amzn_price_fba * cur.quantity * 100) / 100).toFixed(2) : "$" + (Math.round(cur.amzn_price_fbm * cur.quantity * 100) / 100).toFixed(2),
      "% Gain": cur.avg_purchase_price && (cur.amzn_price_fba || cur.amzn_price_fbm) && Math.round(((cur.amzn_price_fba || cur.amzn_price_fbm) - cur.avg_purchase_price) / cur.avg_purchase_price * 100) + "%",
      "  ": <button onClick={store.smartDispatch.bind(null, actions.UPDATE_DETAIL_DATA, cur)}> View Details </button>,
    }
  })
  store.smartDispatch(actions.UPDATE_TABLE_DATA, tableData)
  return tableData
}

/**
 * @function simpleValidateEmail
 * @param  {Object[]} email - String to be tested
 * @return {bool} true if its an email, false otherwise
 */
export function simpleValidateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
