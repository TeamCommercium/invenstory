import { connect } from 'react-redux';

import Dashboard from '../components/dashboard';

import * as api from '../util/requests';

import {
  DASHBOARD_RESET_MODAL,
  UPDATE_SEARCH_STRING,
  TOGGLE_SHOW_SEARCH_OPTION,
  TOGGLE_DELETE_MODAL,
  UPDATE_ERR_SHIP_QUANTITY,
  UPDATE_SHIP_QUANTITY,
  TOGGLE_SHIP_MODAL,
  UPDATE_SEARCH_RESULTS,
  TOGGLE_SHOW_MODAL,
  AMAZON_RESULTS_SELECTION,
  RESET_SHIP_QUANTITY,
  UPDATE_MODAL_SIZE,
  FORM_SMART_ADD,
  UPDATE_FORM_ERR_ASIN,
  UPDATE_FORM_ERR_QUANTITY,
  UPDATE_FORM_ERR_SELLER_SKU,
  UPDATE_FORM_ERR_PURCHASE_PRICE,
  UPDATE_FORM_ERR_PURCHASE_DATE,
  UPDATE_HISTORICAL_DATA,
  UPDATE_LAST_CHANGED_DETAIL_ID,
  UPDATE_DETAIL_DATA
} from '../actionTypes';

const mapState = (store) => ({
  lastDetailId: store.lastDetailId,
  tableData: store.tableData,
  showModal: store.dashboard.showModal,
  showSearchOption: store.dashboard.showSearchOption,
  showShipModal: store.dashboard.showShipModal,
  showDeleteModal: store.dashboard.showDeleteModal,
  lock_sku: store.dashboard.lock_sku,
  modalSize: store.dashboard.modalSize,
  detail: store.detail,
  historical: store.historicalData,
  searchResults: store.dashboard.form.searchResults,
  searchString: store.dashboard.form.searchString,
  asin: store.dashboard.form.asin,
  seller_sku: store.dashboard.form.seller_sku,
  purchase_price: store.dashboard.form.purchase_price,
  purchase_date: store.dashboard.form.purchase_date,
  quantity: store.dashboard.form.quantity,
  ship_quantity: store.dashboard.form.ship_quantity,
  err_asin: store.dashboard.form.err_asin,
  err_purchase_price: store.dashboard.form.err_purchase_price,
  err_purchase_date: store.dashboard.form.err_purchase_date,
  err_quantity: store.dashboard.form.err_quantity,
  err_ship_quantity: store.dashboard.form.err_ship_quantity
});

const mapDispatch = (dispatch) => {
  api.checkAuth();

  const methods = {
    setLastChangedId: (newOldId) => {
      dispatch({ type: UPDATE_LAST_CHANGED_DETAIL_ID, data: newOldId });
    },
    handleBlur: () => {
      dispatch({ type: UPDATE_DETAIL_DATA, data: {} });
    },
    resetModal: () => {
      dispatch({ type: DASHBOARD_RESET_MODAL });
    },
    smartAdd: (data) => {
      dispatch({ type: FORM_SMART_ADD, data});
    },
    setModalSize: () => {
      // Detect mobile screen and set modal size
      if (window.innerWidth <= 569) {
        dispatch({ type: UPDATE_MODAL_SIZE, data: 'large' });
      } else {
        dispatch({ type: UPDATE_MODAL_SIZE, data: 'normal' });
      }
    },
    handleQuantityChange: (val) => {
      dispatch({ type: UPDATE_SHIP_QUANTITY, data: val});
    },
    resetShipQuantity: () => {
      dispatch({ type: RESET_SHIP_QUANTITY });
    },
    handleAmazonResultSelection: (ASIN) => {
      dispatch({ type: AMAZON_RESULTS_SELECTION, data: ASIN});
    },
    handleSearchToggle: () => {
      dispatch({ type: TOGGLE_SHOW_SEARCH_OPTION });
    },
    handleSearchStringChange: (value) => {
      dispatch({ type: UPDATE_SEARCH_STRING, data: value });
    },
    handleModal: () => {
      methods.setModalSize();
      dispatch({ type: TOGGLE_SHOW_MODAL });
    },
    handleAmazonSearch: (searchString) => {
      api.searchAmazonForASIN(searchString)
        .then(data => {
          dispatch({ type: UPDATE_SEARCH_RESULTS, data });
        })
        .catch(err => {
          console.log('There was an error in handleAmazonSearch, dashboard container, line ~240', err);
        });
    },
    handleShipModal: () => {
      methods.setModalSize();
      methods.resetShipQuantity();
      dispatch({ type: TOGGLE_SHIP_MODAL });
    },
    confirmShip: (ship_quantity, id) => {
      if (ship_quantity === undefined || isNaN === undefined) {
        throw new Error(`Shit, didn't work`);
      }

      if (isNaN(ship_quantity) || ship_quantity < 1) {
        dispatch({ type: UPDATE_SHIP_QUANTITY, data: 0 });
      } else {
        dispatch({ type: UPDATE_ERR_SHIP_QUANTITY, data: '' });

        api.shipInventoryItems({ id, quantity: ship_quantity });
        methods.handleShipModal();
      }
    },
    handleDeleteModal: () => {
      methods.setModalSize();
      dispatch({ type: TOGGLE_DELETE_MODAL });
    },
    updateHistoricalData: (id) => {
      api.getHistoricalData(id)
        .then(data => {
          const historicalData = [
            ['Date', 'Price'],
            ...data[0].history.map((cur) =>
              [new Date(cur.amzn_fetch_date), cur.amzn_price_fba || cur.amzn_price_fbm]
            )
          ];
          dispatch({ type: UPDATE_HISTORICAL_DATA, data: historicalData});
        })
        .catch(err => {
          console.log('error in catch from api.getHistoricalData in the DashboardContainer', err);
        });
    },
    confirmDelete: (id) => {
      api.deleteInventoryItem({ id });
      methods.handleBlur();
      methods.handleDeleteModal();
    },
    handleInput: (name, value) => {
      dispatch({ type: name, data: value });
    },
    handleSubmit: (
      asin,
      seller_sku,
      purchase_date,
      purchase_price,
      quantity
    ) => {
      let inputErr = 0;

      // Need to refactor
      if (asin.length < 10) {
        dispatch({ type: UPDATE_FORM_ERR_ASIN, data: 'Must be 10 characters'});
        inputErr++;
      } else {
        dispatch({ type: UPDATE_FORM_ERR_ASIN, data: ''});
      }

      if (!seller_sku || seller_sku.length < 4) {
        dispatch({ type: UPDATE_FORM_ERR_SELLER_SKU, data: 'Must be between 4-30 characters'});
        inputErr++;
      } else {
        dispatch({ type: UPDATE_FORM_ERR_SELLER_SKU, data: ''});
      }

      if (!purchase_price || purchase_price < 0) {
        dispatch({ type: UPDATE_FORM_ERR_PURCHASE_PRICE, data: 'Please enter valid purchase price'});
        inputErr++;
      } else {
        dispatch({ type: UPDATE_FORM_ERR_PURCHASE_PRICE, data: ''});
      }

      if (!quantity || quantity < 1) {
        dispatch({ type: UPDATE_FORM_ERR_QUANTITY, data: 'Please enter valid quantity'});
        inputErr++;
      } else {
        dispatch({ type: UPDATE_FORM_ERR_QUANTITY, data: ''});
      }

      // need to add purchase date check <= current date
      if (!purchase_date) {
        dispatch({ type: UPDATE_FORM_ERR_PURCHASE_DATE, data: 'Please enter purchase date'});
        inputErr++;
      } else {
        dispatch({ type: UPDATE_FORM_ERR_PURCHASE_DATE, data: ''});
      }

      if (!inputErr) {
        const inventory = {};
        // standardize user sku & asin inputs to all caps
        inventory.seller_sku = seller_sku.toUpperCase();
        inventory.asin = asin.toUpperCase();
        // round purchase price to 2 decimals
        inventory.purchase_price = Math.round(purchase_price * 100) / 100;
        inventory.purchase_date = purchase_date;
        inventory.quantity = quantity;
        api.addUserInventory(inventory);
        methods.resetModal();
        methods.handleBlur();
      }
    }
  };
  return methods;
};

export default connect(mapState, mapDispatch)(Dashboard);
