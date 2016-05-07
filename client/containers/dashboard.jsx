import React from 'react'
import { Button, Snackbar } from 'react-toolbox';

import Table from '../components/table'
import { store } from '../store/initStore'
import { subscribeTo } from '../util/util'
import { checkAuth, processNewInventory, searchAmazonForASIN, addUserInventory, shipInventoryItems, deleteInventoryItem, getHistoricalData } from '../util/requests'
import Addproduct from '../components/addproduct'
import Details from '../components/details'

/*
  mounted tracks the mounting status of the container and is used to verify that the container
  is mounted before using setState.

  Backlog is used as storage and will store the updates that were ignored if the container wasn't mounted
  when new information came in.

  Backlog is checked and set back to "not pending" whenever componentDidMount is called



  A lot of state is being used in this container and this seems very un-redux-like at first glance.
  The reason we are using state is because of 2 main reasons.
  1) We are currently not using React-Redux and updating state to rerender seems less hacky than forceUpdate.
  2) There are input fields in one of the components rendered here and it 
 */

let mounted = false;

let backlog = {
  detail: {
    pending: false,
    payload: undefined
  },
  tableData: {
    pending: false,
    payload: undefined
  },
  historical: {
    pending: false,
    payload: undefined
  }
};

export default class DashboardContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      tableData: store.getState().tableData,
      detail: {},
      historical: { graphData: null, options: null},
      showModal: false,
      showSearchOption: false,
      searchResults: [],
      searchString: '',
      asin: '',
      seller_sku: '',
      purchase_price: '',
      purchase_date: '',
      quantity: '',
      err_asin: '',
      err_purchase_price: '',
      err_purchase_date: '',
      err_quantity: '',
      ship_quantity: '',
      err_ship_quantity: '',
    };

    let component = this;
    subscribeTo("detail", function(newState){

      if(mounted)
        component.setState({ "detail": newState.detail })
      else{
        backlog.detail.payload = newState.detail
        backlog.detail.pending = true
      }

      // Get historical data for this item.
      if(newState && newState.detail && typeof newState.detail.id === "number"){
        getHistoricalData(newState.detail.id)
        .then(function(data){
           
          let historicalData = {
            graphData: [ 
              ["Date", "Price"], 
              ...data[0].history.map((cur)=>
                [ new Date(cur.amzn_fetch_date).getTime(), cur.amzn_price_fba || cur.amzn_price_fbm ])
            ],

            options: {
              title: 'Product Historical Price Data',
              curveType: 'function',
              bar: { groupWidth: '75%' },
              isStacked: true,
              hAxis: {
                ticks: data[0].history.map((cur)=> new Date(cur.amzn_fetch_date))
              }
            }
          }

          console.log(historicalData.options.hAxis.ticks)

          if(mounted)
            component.setState({ "historical": historicalData })
          else{
            backlog.historical.payload = historicalData
            backlog.historical.pending = true
          }
        })
        .catch(function(err){
          console.log("error in catch from getHistoricalData in the DashboardContainer", err)
        })
      }
    })

    subscribeTo("tableData", function(newState){
      if(mounted)
        component.setState({ "tableData": newState.tableData })
      else{
        backlog.tableData.payload = newState.tableData
        backlog.tableData.pending = true
      }
    })
  }

  componentDidMount(){
    mounted = true;

    if(backlog.detail.pending){
      this.setState({ "detail": backlog.detail.payload })
      backlog.detail.pending = false
    }

    if(backlog.tableData.pending){
      this.setState({ "tableData": backlog.tableData.payload })
      backlog.tableData.pending = false
    }

    if(backlog.tableData.pending){
      this.setState({ "historical": backlog.historical.payload })
      backlog.historical.pending = false
    }

    if(document.getElementById("styles__table___1QENt") && document.getElementById("styles__table___1QENt").getElementsByTagName('input') && document.getElementById("styles__table___1QENt").getElementsByTagName('input')[0])
      document.getElementsByTagName('input')[0].placeholder = "Search Table . ."
  }


  componentWillMount(){
    checkAuth()
  }

  componentWillUnmount(){
    mounted = false;
  }

  handleInput(name, value) {
    this.setState({[name]: value});
  }

  handleModal(){
    this.setState({showModal: !this.state.showModal});
  }



  handleSubmit(){
    let inputErr = 0;
    
  // Need to refactor
    if (this.state.asin.length < 10) {
      this.setState({err_asin: "Must be 10 characters"});
      inputErr++;
    } else this.setState({err_asin: ''});

    if (!this.state.seller_sku || this.state.seller_sku.length < 4) {
      this.setState({err_seller_sku: "Must be between 4-30 characters"});
      inputErr++;
    } else this.setState({err_seller_sku: ''});

    if (!this.state.purchase_price || this.state.purchase_price < 0) {
      this.setState({err_purchase_price: "Please enter valid purchase price"});
      inputErr++;
    } else this.setState({err_purchase_price: ''});

    if (!this.state.quantity || this.state.quantity < 1) {
      this.setState({err_quantity: "Please enter valid quantity"});
      inputErr++;
    } else this.setState({err_quantity: ''});

    // need to add purchase date check <= current date
    if (!this.state.purchase_date) {
      this.setState({err_purchase_date: "Please enter purchase date"});
      inputErr++;
    } else this.setState({err_purchase_date: ''});

    if (!inputErr) {
        let inventory = {};
        // standardize user sku & asin inputs to all caps
        inventory.seller_sku = this.state.seller_sku.toUpperCase();
        inventory.asin = this.state.asin.toUpperCase();
        // round purchase price to 2 decimals
        inventory.purchase_price = Math.round(this.state.purchase_price * 100) / 100;
        inventory.purchase_date = this.state.purchase_date;
        inventory.quantity = this.state.quantity;
        addUserInventory(inventory);

        this.resetModal();
      console.log("INVENTORY OBJ SENT:", inventory);
    }
  }

  resetModal(){
    this.setState({
      asin: '',
      seller_sku: '',
      purchase_price: '',
      purchase_quantity: '',
      purchase_date: '',
      err_asin: '',
      err_purchase_price: '',
      err_purchase_date: '',
      err_quantity: '',
      ship_quantity: '',
      err_ship_quantity: '',
      showModal: false
    });
  }
  
  handleSearchToggle(){
    this.setState({showSearchOption: !this.state.showSearchOption})
  }

  handleSearchStringChange(value){
    this.setState({searchString: value})
  }

  handleAmazonSearch(){
    let component = this;
    searchAmazonForASIN(this.state.searchString)
    .then(function(data){
      component.setState({searchResults: data})
    })
    .catch(function(err){
      console.log("There was an error in handleAmazonSearch, dashboard container, line ~240")
    })
  }

  handleAmazonResultSelection(ASIN){
    this.setState({ 
      asin: ASIN,
      searchResults: [],
      searchString: '',
      showSearchOption: false
    })
  }

  handleBlur(){
    this.setState({detail: {}});
  }

  confirmDelete(id, quantity, seller_sku){
    if(confirm("Are you sure you want to delete all " + quantity + (quantity === 1 ? " unit of " : " units of ") + seller_sku + " from your inventory?"))
      deleteInventoryItem({id: id})
  }

  confirmShip(id, seller_sku, amzn_price_fba){
    if (!this.state.ship_quantity || this.state.ship_quantity < 1) {
      this.setState({err_ship_quantity: "Please enter valid quantity"});
    } else if (confirm("Please confirm that you are shipping " + this.state.ship_quantity + (this.state.ship_quantity === 1 ? " unit of " : " units of ") + seller_sku + " valued at $" + (amzn_price_fba * this.state.ship_quantity).toFixed(2) + " from your inventory?")) {
        this.setState({err_ship_quantity: ''});
        shipInventoryItems({id: id, quantity: this.state.ship_quantity})
    } 
  }

  handleQuantityChange(val){
    this.setState({ship_quantity: val})
  }

  smartAdd(data){
    this.setState({
      asin: data.amzn_asin,
      seller_sku: data.seller_sku,
      showModal: true,
    });
  }

  render(){
    var details, dashboard;

    if(this.state.detail && this.state.detail.amzn_asin)
     details = <Details
        smartAdd={this.smartAdd.bind(this)}
        handleQuantityChange={this.handleQuantityChange.bind(this)}
        quantity={this.state.ship_quantity}
        deleteAll={this.confirmDelete.bind(this)} 
        confirmShip={this.confirmShip.bind(this)} 
        hideDetails={this.handleBlur.bind(this)} 
        err_quantity={this.state.err_ship_quantity}
        quantity={this.state.ship_quantity}
        data={this.state.detail}
        historical={this.state.historical.graphData}
        options={this.state.historical.options} 
       />

    if(this.state.tableData[0])
      dashboard = <Table data={this.state.tableData} columnNames={Object.keys(this.state.tableData[0])}/>


    return <div>
      <Button 
        className="styles__inlineButton___16AEc"
        label='Add Product' raised floating
        onMouseUp={this.handleModal.bind(this)}
      />
      <br/>
      {dashboard}
      {this.props.children}
      <Addproduct 
        active={this.state.showModal}
        handleSubmit={this.handleSubmit.bind(this)}
        handleInput={this.handleInput.bind(this)}
        resetModal={this.resetModal.bind(this)}
        asin={this.state.asin}
        seller_sku={this.state.seller_sku}
        purchase_price={this.state.purchase_price}
        quantity={this.state.quantity}
        purchase_date={this.state.purchase_date}
        err_asin={this.state.err_asin}
        err_seller_sku={this.state.err_seller_sku}
        err_purchase_price={this.state.err_purchase_price}
        err_quantity={this.state.err_quantity}
        err_purchase_date={this.state.err_purchase_date}
        handleSearchStringChange={this.handleSearchStringChange.bind(this)}
        handleAmazonSearch={this.handleAmazonSearch.bind(this)}
        handleAmazonResultSelection={this.handleAmazonResultSelection.bind(this)}
        handleSearchToggle={this.handleSearchToggle.bind(this)}
        showSearch={this.state.showSearchOption}
        searchResults={this.state.searchResults}
        searchString={this.state.searchString}
      /> 
      {details}
    </div>
  }
}
