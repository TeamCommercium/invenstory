import React from 'react';
import { Button } from 'react-toolbox';
import { connect } from 'react-redux';

import Table from '../components/table';
import Addproduct from '../components/addproduct';
import Ship from '../components/ship';
import DeleteProduct from '../components/deleteproduct';
import Details from '../components/details';

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
  HIDE_SEARCH,
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
  UPDATE_HISTORICAL_DATA
} from '../actionTypes';


function calculateTotals(data) {
  let totalValue = 0;
  let totalCost = 0;
  data.forEach(item => {
    totalValue += Number((item['Total Value']).slice(1));
    totalCost += Number((item['Total Cost']).slice(1));
  });

  return { totalCost, totalValue };
}

class DashboardContainer extends React.Component {

  componentDidMount() {
    if (document.getElementById('styles__table___1QENt')
      && document.getElementById('styles__table___1QENt').getElementsByTagName('input')
      && document.getElementById('styles__table___1QENt').getElementsByTagName('input')[0]
    ) {
      document.getElementsByTagName('input')[0].placeholder = ' Search Table ...';
      const element = document.getElementsByClassName('reactable-filterer')[0];
      const iconElement = document.createElement('span');
      iconElement.className += 'material-icons md-dark';
      iconElement.innerHTML += 'search';

      element.insertBefore(iconElement, element.firstChild);
    }
  }

  render() {
    let details;
    let dashboard;

    const historicalOptions = {
      title: 'Product Historical Price Data',
      curveType: 'function',
      bar: { groupWidth: '75%' },
      isStacked: true,
      pointSize: 3,
      hAxis: {
        format: 'MMM d, y'
      }
    };

    if (this.props.detail && typeof this.props.detail.id === 'number') {
      api.getHistoricalData(this.props.detail.id)
      .then(data => {
        const historicalData = [
          ['Date', 'Price'],
          ...data[0].history.map((cur) =>
            [new Date(cur.amzn_fetch_date), cur.amzn_price_fba || cur.amzn_price_fbm]
          )
        ];
        this.props.updateHistoricalData(historicalData);
      })
      .catch(err => {
        console.log('error in catch from api.getHistoricalData in the DashboardContainer', err);
      });
    }

    if (this.props.detail && this.props.detail.amzn_asin) {
      details = (
        <Details
          smartAdd={this.props.smartAdd.bind(this)}
          hideDetails={this.props.handleBlur}
          data={this.props.detail}
          historical={this.props.historical}
          options={historicalOptions}
          handleShipModal={this.props.handleShipModal.bind(this)}
          handleDeleteModal={this.props.handleDeleteModal.bind(this)}
        />
      );
    }

    if (this.props.tableData !== undefined && this.props.tableData[0]) {
      dashboard = (
        <Table
          data={this.props.tableData}
          columnNames={Object.keys(this.props.tableData[0])}
        />
      );
    }

    return (
      <div>
        <div style={{display: 'inline'}}>
          <h3 style={{display: 'inline', color: '#264653', fontWeight: 900}}>
            Total Inventory Value:
            <span style={{color: 'green'}}>
              ${(calculateTotals(this.props.tableData).totalValue).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
            </span>
          </h3>
          <Button
            className='styles__inlineButton___16AEc'
            style={{display: 'inline', float: 'right'}}
            label='Add Product'
            onMouseUp={this.props.handleModal.bind(this)}
            raised floating
          />
        </div>
        <h5 style={{color: '#264653', marginTop: '5px', marginBottom: '5px'}}>
          Original Cost: ${(calculateTotals(this.props.tableData).totalCost).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
        </h5>
        <h5 style={{color: '#264653', marginTop: '5px', marginBottom: '5px'}}>
          Current ROI:
          {
            calculateTotals(this.props.tableData).totalValue
            ? ((((calculateTotals(this.props.tableData).totalValue)) / ((calculateTotals(this.props.tableData).totalCost)) - 1) * 100).toFixed(1)
            : 0
          }
          %
        </h5>
        <br />
        {dashboard}
        {this.props.children}
        <Addproduct
          active={this.props.showModal}
          modalSize={this.props.modalSize}
          handleSubmit={this.props.handleSubmit.bind(this)}
          handleInput={this.props.handleInput.bind(this)}
          resetModal={this.props.resetModal.bind(this)}
          asin={this.props.asin}
          seller_sku={this.props.seller_sku}
          lock_sku={this.props.lock_sku}
          purchase_price={this.props.purchase_price}
          quantity={this.props.quantity}
          purchase_date={this.props.purchase_date}
          err_asin={this.props.err_asin}
          err_seller_sku={this.props.err_seller_sku}
          err_purchase_price={this.props.err_purchase_price}
          err_quantity={this.props.err_quantity}
          err_purchase_date={this.props.err_purchase_date}
          handleSearchStringChange={this.props.handleSearchStringChange.bind(this)}
          handleAmazonSearch={this.props.handleAmazonSearch.bind(this)}
          handleAmazonResultSelection={this.props.handleAmazonResultSelection.bind(this)}
          handleSearchToggle={this.props.handleSearchToggle.bind(this)}
          showSearch={this.props.showSearchOption}
          searchResults={this.props.searchResults}
          searchString={this.props.searchString}
        />
        <Ship
          active={this.props.showShipModal}
          modalSize={this.props.modalSize}
          data={this.props.detail}
          ship_quantity={this.props.ship_quantity}
          err_quantity={this.props.err_ship_quantity}
          handleShipModal={this.props.handleShipModal}
          handleQuantityChange={this.props.handleQuantityChange.bind(this)}
          confirmShip={this.props.confirmShip.bind(this, this.props.ship_quantity)}
        />
        <DeleteProduct
          active={this.props.showDeleteModal}
          modalSize={this.props.modalSize}
          data={this.props.detail}
          handleDeleteModal={this.props.handleDeleteModal.bind(this)}
          confirmDelete={this.props.confirmDelete.bind(this)}
        />
        {details}
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  tableData: React.PropTypes.array,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  showModal: React.PropTypes.bool,
  showShipModal: React.PropTypes.bool,
  showDeleteModal: React.PropTypes.bool,
  showSearchOption: React.PropTypes.bool,
  lock_sku: React.PropTypes.bool,
  modalSize: React.PropTypes.string,
  detail: React.PropTypes.object,
  historical: React.PropTypes.array,
  searchResults: React.PropTypes.string,
  searchString: React.PropTypes.string,
  asin: React.PropTypes.string,
  seller_sku: React.PropTypes.string,
  purchase_price: React.PropTypes.string,
  purchase_date: React.PropTypes.string,
  quantity: React.PropTypes.string,
  ship_quantity: React.PropTypes.string,
  err_asin: React.PropTypes.string,
  err_purchase_price: React.PropTypes.string,
  err_purchase_date: React.PropTypes.string,
  err_quantity: React.PropTypes.string,
  err_ship_quantity: React.PropTypes.string,

  resetModal: React.PropTypes.func,
  smartAdd: React.PropTypes.func,
  setModalSize: React.PropTypes.func,
  handleQuantityChange: React.PropTypes.func,
  resetShipQuantity: React.PropTypes.func,
  handleAmazonResultSelection: React.PropTypes.func,
  handleSearchToggle: React.PropTypes.func,
  handleSearchStringChange: React.PropTypes.func,
  handleModal: React.PropTypes.func,
  handleAmazonSearch: React.PropTypes.func,
  confirmShip: React.PropTypes.func,
  handleDeleteModal: React.PropTypes.func,
  updateHistoricalData: React.PropTypes.func,
  confirmDelete: React.PropTypes.func,
  handleInput: React.PropTypes.func,
  handleBlur: React.PropTypes.func,
  handleSubmit: React.PropTypes.func
};

const mapState = (store) => ({
  tableData: store.tableData,
  showModal: store.dashboard.showModal,
  showSearchOption: store.dashboard.showSearchOption,
  showShipModal: store.dashboard.showShipModal,
  showDeleteModal: store.dashboard.showDeleteModal,
  lock_sku: store.dashboard.lock_sku,
  modalSize: store.dashboard.modalSize,
  detail: store.detail,
  historical: store.historicalData,
  searchResults: store.dashboard.form.err_ship_quantity,
  searchString: store.dashboard.form.err_ship_quantity,
  asin: store.dashboard.form.err_ship_quantity,
  seller_sku: store.dashboard.form.err_ship_quantity,
  purchase_price: store.dashboard.form.err_ship_quantity,
  purchase_date: store.dashboard.form.err_ship_quantity,
  quantity: store.dashboard.form.err_ship_quantity,
  ship_quantity: store.dashboard.form.err_ship_quantity,
  err_asin: store.dashboard.form.err_ship_quantity,
  err_purchase_price: store.dashboard.form.err_ship_quantity,
  err_purchase_date: store.dashboard.form.err_ship_quantity,
  err_quantity: store.dashboard.form.err_ship_quantity,
  err_ship_quantity: store.dashboard.form.err_ship_quantity
});

const mapDispatch = (dispatch) => {
  api.checkAuth();

  const methods = {
    handleBlur: () => {
      dispatch({ type: 'UPDATE_DETAIL_DATA', data: {} });
    },
    resetModal: () => {
      dispatch({ type: DASHBOARD_RESET_MODAL });
    },
    smartAdd: (data) => {
      // this.setState({
      //   lock_sku: true,
      //   showSearchOption: false,
      //   asin: data.amzn_asin,
      //   seller_sku: data.seller_sku,
      //   quantity: '',
      //   showModal: true
      // });

      dispatch({ type: FORM_SMART_ADD, data});
    },
      // Detect mobile screen and set modal size
    setModalSize: () => {
      if (window.innerWidth <= 569) {
        dispatch({ type: UPDATE_MODAL_SIZE, data: 'large' });
        // this.setState({modalSize: 'large'});
      } else {
        dispatch({ type: UPDATE_MODAL_SIZE, data: 'normal' });
        // this.setState({modalSize: 'normal'});
      }
    },
    handleQuantityChange: (val) => {
      // this.setState({ship_quantity: val});
      dispatch({ type: UPDATE_SHIP_QUANTITY, data: val});
    },
    resetShipQuantity: () => {
      // this.setState({
      //   ship_quantity: '',
      //   err_ship_quantity: ''
      // });
      dispatch({ type: RESET_SHIP_QUANTITY });
    },
    handleAmazonResultSelection: (ASIN) => {
      // this.setState({
      //   asin: ASIN,
      //   searchResults: [],
      //   searchString: '',
      //   showSearchOption: false
      // });
      dispatch({ type: AMAZON_RESULTS_SELECTION, data: ASIN});
    },
    handleSearchToggle: () => {
      // this.setState({ showSearchOption: !this.state.showSearchOption });
      dispatch({ type: TOGGLE_SHOW_SEARCH_OPTION });
    },
    handleSearchStringChange: (value) => {
      // this.setState({ searchString: value });
      dispatch({ type: UPDATE_SEARCH_STRING, data: value });
    },
    handleModal: () => {
      methods.setModalSize();
      // this.setState({ showModal: !this.state.showModal });
      dispatch({ type: TOGGLE_SHOW_MODAL });
    },
    handleAmazonSearch: (searchString) => {
      // if (!this.state.showSearchOption) {
      //   this.setState({ showSearchOption: !this.state.showSearchOption });
      // }
      dispatch({ type: HIDE_SEARCH });

      api.searchAmazonForASIN(searchString)
        .then(data => {
          // setState searchresult: data
          dispatch({ type: UPDATE_SEARCH_RESULTS, data });
        })
        .catch(err => {
          console.log('There was an error in handleAmazonSearch, dashboard container, line ~240', err);
        });
    },
    handleShipModal: () => {
      // methods.setModalSize();
      // methods.resetShipQuantity();
      // this.setState({
      //   showShipModal: !this.state.showShipModal
      // });
      dispatch({ type: TOGGLE_SHIP_MODAL });
    },
    confirmShip: (id, ship_quantity) => {
      if (ship_quantity === undefined || isNaN === undefined) {
        throw new Error(`Shit, didn't work`);
      }

      if (isNaN(ship_quantity) || ship_quantity < 1) {
        // this.setState({ship_quantity: 0});
        dispatch({ type: UPDATE_SHIP_QUANTITY, data: 0 });
      } else {
        // this.setState({err_ship_quantity: ''});
        dispatch({ type: UPDATE_ERR_SHIP_QUANTITY, data: '' });

        api.shipInventoryItems({ id, quantity: ship_quantity });
        methods.handleShipModal();
        console.log('Confirmed Shipped:', ship_quantity);
      }
    },
    handleDeleteModal: () => {
      methods.setModalSize();
      // this.setState({
      //   showDeleteModal: !this.state.showDeleteModal
      // });
      dispatch({ type: TOGGLE_DELETE_MODAL });
    },
    updateHistoricalData: (historicalData) => {
      dispatch({ type: UPDATE_HISTORICAL_DATA, data: historicalData});
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
      if (asin === undefined
        || seller_sku === undefined
        || purchase_price === undefined
        || purchase_date === undefined
        || quantity === undefined) {
        console.log('Shit, missed a value');
      }

      console.log('asin', asin, 'sku', seller_sku,
        'date', purchase_date, 'price', purchase_price,
        'qty', quantity
      );

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

export default connect(mapState, mapDispatch)(DashboardContainer);
