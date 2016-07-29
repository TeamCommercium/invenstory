import React from 'react';
import { Button } from 'react-toolbox';

import Ship from '../components/ship';
import Table from '../components/table';
import Details from '../components/details';
import Addproduct from '../components/addproduct';
import DeleteProduct from '../components/deleteproduct';


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


    // If there is a detail ID, the user wants to view specific data.
    // If the data.id === lastDetailId, we could be entering
    //  an infinite loop. To prevent this we call setLastChangedId
    if (this.props.detail !== undefined
      && typeof this.props.detail.id === 'number'
      && this.props.lastDetailId !== this.props.detail.id
    ) {
      this.props.setLastChangedId(this.props.detail.id);
      this.props.updateHistoricalData(this.props.detail.id);
    }

    if (this.props.detail && this.props.detail.amzn_asin) {
      details = (
        <Details
          smartAdd={this.props.smartAdd.bind(this)}
          hideDetails={() => this.props.handleBlur(this.props.detail.id)}
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
  lastDetailId: React.PropTypes.number,
  showModal: React.PropTypes.bool,
  showShipModal: React.PropTypes.bool,
  showDeleteModal: React.PropTypes.bool,
  showSearchOption: React.PropTypes.bool,
  lock_sku: React.PropTypes.bool,
  modalSize: React.PropTypes.string,
  detail: React.PropTypes.object,
  historical: React.PropTypes.array,
  searchResults: React.PropTypes.array,
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
  err_seller_sku: React.PropTypes.string,

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
  handleSubmit: React.PropTypes.func,
  handleShipModal: React.PropTypes.func,
  setLastChangedId: React.PropTypes.func
};

export default DashboardContainer;
