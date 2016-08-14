import initialState from '../store/initialState';
import {
  TOGGLE_DELETE_MODAL,
  TOGGLE_SHIP_MODAL,
  UPDATE_SEARCH_RESULTS,
  HIDE_SEARCH,
  TOGGLE_SHOW_MODAL,
  FORM_SMART_ADD,
  UPDATE_MODAL_SIZE,
  UPDATE_ERR_SHIP_QUANTITY,
  UPDATE_SHIP_QUANTITY,
  RESET_SHIP_QUANTITY,
  AMAZON_RESULTS_SELECTION,
  TOGGLE_SHOW_SEARCH_OPTION,
  UPDATE_SEARCH_STRING,
  DASHBOARD_RESET_MODAL,
  UPDATE_FORM_ERR_PURCHASE_DATE,
  UPDATE_FORM_ERR_PURCHASE_PRICE,
  UPDATE_FORM_ERR_SELLER_SKU,
  UPDATE_FORM_ERR_ASIN,
  UPDATE_FORM_ERR_QUANTITY,
  UPDATE_FORM_QUANTITY,
  UPDATE_FORM_PURCHASE_DATE,
  UPDATE_FORM_PURCHASE_PRICE,
  UPDATE_FORM_SELLER_SKU,
  UPDATE_FORM_ASIN
} from '../actionTypes';

/**
 * Reducer for dashboard
 * @function dashboardReducer
 * @param {Object} state
 * @param {string} action
 * @return new value for this store property or default state
 */

export default function(state = initialState.dashboard, action) {
  const oldState = Object.assign({}, state);

  switch (action.type) {
    case DASHBOARD_RESET_MODAL:
      oldState.lock_sku               = false;
      oldState.showModal              = false;
      oldState.showSearchOption       = true;
      oldState.form.quantity          = 0;
      oldState.form.purchase_price    = 0;
      oldState.form.purchase_quantity = 0;
      oldState.form.asin              = '';
      oldState.form.seller_sku        = '';
      oldState.form.purchase_date     = '';
      oldState.form.err_asin          = '';
      oldState.form.err_seller_sku    = '';
      oldState.form.err_purchase_price= '';
      oldState.form.err_purchase_date = '';
      oldState.form.err_quantity      = '';
      return oldState;
 
    case UPDATE_SEARCH_STRING:
      oldState.form.searchString = action.data;
      return oldState;

    case TOGGLE_SHOW_SEARCH_OPTION:
      oldState.showSearchOption = !oldState.showSearchOption;
      return oldState;

    case AMAZON_RESULTS_SELECTION:
      oldState.form.asin = action.data;
      oldState.form.searchResults = [];
      oldState.form.searchString = '';
      oldState.showSearchOption = false;
      return oldState;

    case RESET_SHIP_QUANTITY:
      oldState.form.ship_quantity = 0;
      oldState.form.err_ship_quantity = '';
      return oldState;

    case UPDATE_SHIP_QUANTITY:
      oldState.form.ship_quantity = Number(action.data);
      return oldState;

    case UPDATE_ERR_SHIP_QUANTITY:
      oldState.form.err_ship_quantity = action.data;
      return oldState;

    case UPDATE_MODAL_SIZE:
      oldState.modalSize = action.data;
      return oldState;

    case FORM_SMART_ADD:
      oldState.showModal = true;
      oldState.showSearchOption = false;
      oldState.lock_sku = true;
      oldState.form.quantity = 0;
      oldState.form.asin = action.data.amzn_asin;
      oldState.form.seller_sku = action.data.seller_sku;
      return oldState;

    case TOGGLE_SHOW_MODAL:
      oldState.showModal = !oldState.showModal;
      return oldState;

    case HIDE_SEARCH:
      oldState.showSearchOption = false;
      return oldState;

    case UPDATE_SEARCH_RESULTS:
      oldState.form.searchResults = action.data;
      return oldState;

    case TOGGLE_SHIP_MODAL:
      oldState.showShipModal = !oldState.showShipModal;
      return oldState;

    case TOGGLE_DELETE_MODAL:
      oldState.showDeleteModal = !oldState.showDeleteModal;
      return oldState;

    case UPDATE_FORM_ASIN:
      oldState.form.asin = action.data;
      return oldState;

    case UPDATE_FORM_SELLER_SKU:
      oldState.form.seller_sku = action.data;
      return oldState;

    case UPDATE_FORM_PURCHASE_PRICE:
      oldState.form.purchase_price = Number(action.data);
      return oldState;

    case UPDATE_FORM_PURCHASE_DATE:
      oldState.form.purchase_date = action.data;
      return oldState;

    case UPDATE_FORM_QUANTITY:
      oldState.form.quantity = Number(action.data);
      return oldState;

    case UPDATE_FORM_ERR_QUANTITY:
      oldState.form.err_quantity = action.data;
      return oldState;

    case UPDATE_FORM_ERR_ASIN:
      oldState.form.err_asin = action.data;
      return oldState;

    case UPDATE_FORM_ERR_SELLER_SKU:
      oldState.form.err_seller_sku = action.data;
      return oldState;

    case UPDATE_FORM_ERR_PURCHASE_PRICE:
      oldState.form.err_purchase_price = action.data;
      return oldState;

    case UPDATE_FORM_ERR_PURCHASE_DATE:
      oldState.form.err_purchase_date = action.data;
      return oldState;

    default:
      return state;
  }
}
