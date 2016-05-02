import React from 'react'
import { Button, Snackbar } from 'react-toolbox';

import Dashboard from '../components/dashboard'
import { store } from '../store/initStore'
import { subscribeTo, checkAuth, processNewInventory, addUserInventory } from '../util/util'
import Addproduct from '../components/addproduct'
import Details from '../components/details'

let mounted = false;

let backlog = {
  detail: {
    pending: false,
    payload: undefined
  },
  tableData: {
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
      showModal: false,
      asin: '',
      seller_sku: '',
      purchase_price: '',
      purchase_date: '',
      quantity: '',
      err_asin: '',
      err_purchase_price: '',
      err_purchase_date: '',
      err_quantity: ''    
    };

    let component = this;
    subscribeTo("detail", function(newState){
      if(mounted)
        component.setState({ "detail": newState.detail })
      else{
        backlog.detail.payload = newState.detail
        backlog.detail.pending = true
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

    if(document.getElementById("table").getElementsByTagName('input') && document.getElementById("table").getElementsByTagName('input')[0])
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
    this.state = ({
      tableData: this.state.tableData,
      detail: this.state.detail,
      asin: '',
      seller_sku: '',
      purchase_price: '',
      purchase_quantity: '',
      purchase_date: '',
      err_asin: '',
      err_purchase_price: '',
      err_purchase_date: '',
      err_quantity: '',
    })
    this.setState({showModal: false});
  }

  handleBlur(){
    console.log("handleBlur called")
    this.setState({detail: {}});
  }

  render(){
    return <div>
      <Button 
        className="styles__inlineButton___16AEc"
        label='Add Product' raised floating
        onMouseUp={this.handleModal.bind(this)}
      /><br/>
      
      <Dashboard data={this.state.tableData} columnNames={Object.keys(this.state.tableData[0])}/>
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
      /> 
      
      <Details hideDetails={this.handleBlur.bind(this)} data={this.state.detail} />
    </div>
  }
}
