/**
 * @description Initial value of the store
 */

export default {
  tableData: [],
  graphData: [],
  historicalData: [],
  pieChartData: [],
  authenticated: false,
  lastChanged: null,
  detail: {},
  notifications: [],
  tab: 0,
  userSettings: {
    name: '',
    zipcode: '',
    email: '',
    err_email: '',
    mailNotifications: false
  },
  dashboard: {
    showModal: false,
    showSearchOption: true,
    showShipModal: false,
    showDeleteModal: false,
    lock_sku: false,
    modalSize: 'large',
    form: {
      searchResults: [],
      searchString: '',
      asin: '',
      seller_sku: '',
      purchase_price: '',
      purchase_date: '',
      quantity: '',
      ship_quantity: '',
      err_asin: '',
      err_purchase_price: '',
      err_purchase_date: '',
      err_quantity: '',
      err_ship_quantity: ''
    }
  }
};
