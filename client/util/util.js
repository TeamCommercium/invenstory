import React from 'react';
import { store } from '../store/initStore';
import * as actions from '../actionTypes';
import { Button } from 'react-toolbox';

/**
 * @function redirect
 * @param {string} address - URL to redirect to
 * @param {object} _window - Optional parameter for window object (used in testing)
 * @return a function that will redirect to the given address when invoked
 */

export function redirect(address, _window = window) {
  return () => {
    _window.location.href = address;
  };
}

/**
 * @function processUserSettings
 * @param  {Object} settings - Object with deeply nested properties.
 * @return {Object} formatted user settings
 */
export function processUserSettings(settings) {
  return {
    username: settings.user.amzn_username,
    email: settings.user.amzn_email,
    zipcode: settings.user.amzn_zip
  };
}

/**
 * function processRawInventory
 * @param  {Object[]} inventory - Inventory data from the server
 * @return {Object[]} Validated object with a new profit propery
 */
export function processRawInventory(inventory) {
  return inventory.map(cur => {
    cur.profit = cur.avg_purchase_price && cur.amzn_price_fba && Math.round((cur.amzn_price_fba - cur.avg_purchase_price) / cur.avg_purchase_price * 100);
    Object.keys(cur).forEach(key => {
      if (cur[key] === null || cur[key] === undefined) {
        if (key === 'amzn_thumb_url') {
          cur[key] = '/assets/defaultImage.png';
        } else if (key === 'amzn_title') {
          cur[key] = 'Title not provided.';
        } else {
          cur[key] = 0;
        }
      }
    });
    return cur;
  });
}

/**
 * @function processNotifications
 * @param  {Object[]} inventory - Processed inventory that was returned by processRawInventory
 * @return {Object[]} Filtered by profit and sorted into descending order
 */
export function processNotifications(inventory) {
  // Could build in settings here
  const notifications = inventory
    .filter(cur => cur.profit > 150)
    .sort((a, b) => b.profit - a.profit);

  store.dispatch({ type: actions.UPDATE_NOTIFICATIONS, data: notifications });
  return notifications;
}

/**
 * A function that processes the inventory data to a format usable by the bar graph
 * @function processGeneralGraphData
 * @param  {Object[]} inventory - Processed inventory that was returned by processRawInventory
 * @return {Object[]} Formatted into data useful to Google Charts bar graph
 */
export function processGeneralGraphData(inventory) {
  const lineData = [['SKU', 'Cost', {type: 'string', role: 'tooltip'}, 'Current Value', {type: 'string', role: 'tooltip'}]];
  
  inventory.forEach(cur => {
    const amznPrice = cur.amzn_price_fba || cur.amzn_price_fbm;
    lineData.push(
      [
        cur.seller_sku,
        Math.round(cur.avg_purchase_price * 100) / 100,
        `${cur.amzn_title && cur.amzn_title.slice(0, 35)}, QTY:${cur.quantity} COST: $${cur.avg_purchase_price.toFixed(2)} TOT COST: $${(cur.avg_purchase_price * cur.quantity).toFixed(2)}`,
        Math.round(amznPrice * 100) / 100,
        `${cur.amzn_title && cur.amzn_title.slice(0, 35)}, CUR VAL: $${amznPrice.toFixed(2)} TOT VAL: $${(amznPrice * cur.quantity).toFixed(2)} ROI: ${((amznPrice - cur.avg_purchase_price) / cur.avg_purchase_price * 100).toFixed(0)}%`
      ]
    );
  });

  store.dispatch({ type: actions.UPDATE_GRAPH_DATA, data: lineData });
  return lineData;
}

/**
 * A function that processes the inventory data to a format usable by the line graph
 * @function processPieChartData
 * @param  {Object[]} inventory - Processed inventory that was returned by processRawInventory
 * @return {Object[]} Formatted into data useful to Google Charts line graph
 */
export function processPieChartData(inventory) {
  const lineData = [['SKU', 'Cost', {type: 'string', role: 'tooltip'}]];
  
  inventory.forEach(cur => {
    const amznPrice = cur.amzn_price_fba || cur.amzn_price_fbm;
    lineData.push(
      [
        `${cur.seller_sku}, QTY: ${cur.quantity}`,
        Math.round(amznPrice * cur.quantity * 100) / 100,
        `${cur.amzn_title && cur.amzn_title.slice(0, 55)} - Total Value: $${(amznPrice * cur.quantity).toFixed(2)}`
      ]
    );
  });
  store.dispatch({ type: actions.UPDATE_PIECHART_DATA, data: lineData });
  return lineData;
}

/**
 * A function that processes the inventory data to a format usable by the line graph
 * @function processGeneralTableData
 * @param  {Object[]} inventory - Processed inventory that was returned by processRawInventory
 * @return {Object[]} Formatted into data useful to reactable's table
 */
export function processGeneralTableData(inventory) {
  const tableData = inventory.map(cur => ({
    ' ': <img alt='thumbnail' src={cur.amzn_thumb_url} />,
    SKU: cur.seller_sku,
    ASIN: cur.amzn_asin,
    Title: cur.amzn_title && (cur.amzn_title.slice(0, 100)),
    QTY: cur.quantity,
    Cost: cur.avg_purchase_price && `$${(Math.round(cur.avg_purchase_price * 100) / 100).toFixed(2)}`,
    'FBM Price': cur.amzn_price_fbm && `$${(Math.round(cur.amzn_price_fbm * 100) / 100).toFixed(2)}`,
    'FBA Price': cur.amzn_price_fba && `$${(Math.round(cur.amzn_price_fba * 100) / 100).toFixed(2)}`,
    'Total Cost': `$${(Math.round(cur.avg_purchase_price * cur.quantity * 100) / 100).toFixed(2)}`,
    'Total Value': cur.amzn_price_fba ? `$${(Math.round(cur.amzn_price_fba * cur.quantity * 100) / 100).toFixed(2)}` : `$${(Math.round(cur.amzn_price_fbm * cur.quantity * 100) / 100).toFixed(2)}`,
    ROI: `${cur.avg_purchase_price && (cur.amzn_price_fba || cur.amzn_price_fbm) && Math.round(((cur.amzn_price_fba || cur.amzn_price_fbm) - cur.avg_purchase_price) / cur.avg_purchase_price * 100)}%`,
    '  ': <Button
      className='styles__viewDetailsButton___sBKyW'
      onClick={() => {
        store.dispatch({ type: actions.UPDATE_DETAIL_DATA, data: cur });
      }}
      floating
      raised
    > View Details
    </Button>
  }));
  
  store.dispatch({ type: actions.UPDATE_TABLE_DATA, data: tableData });
  return tableData;
}

/**
 * @function simpleValidateEmail
 * @param  {Object[]} email - String to be tested
 * @return {bool} true if its an email, false otherwise
 */
export function simpleValidateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

/**
 * Called whenever new data is recieved by requests: processNewInventory
 * All of the functions invoked within processNewData format the new data as needed and save it to the store.
 * function processNewData
 * @param  {Object[]} inventory - Inventory data from the server
 * @return {Object[]} Validated object with a new profit propery
 */

export function processNewData(data) {
  // Each of these functions return something for testing purposes, but don't need to.

  const withProfit = processRawInventory(data);
  
  processGeneralGraphData(withProfit);
  processPieChartData(withProfit);
  processGeneralTableData(withProfit);
  processNotifications(withProfit);
}
