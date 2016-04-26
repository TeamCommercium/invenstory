import React from 'react'
import { Button, Input } from 'react-toolbox'

import Navbar from '../components/navbar'
import Dashboard from '../components/dashboard'
import { store } from '../store/initStore'
import { subscribeTo, checkAuth, processNewInventory, addUserInventory } from '../util/util'
import Addproduct from '../components/addproduct'

var newData = {
  pending: false,
  data: null
}
    
export default class DashboardContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      tableData: store.getState().tableData,
      showModal: false,
      asin: '',
      purchase_price: '',
      purchase_date: '',
      quantity: '',
      err_asin: null,
      err_purchase_price: null,
      err_purchase_date: null,
      err_quantity: null
    };

    let component = this;
    subscribeTo("tableData", function(newState){
      // component.setState({"tableData": newState.tableData});
      newData.pending = true
      newData.data = newState.tableData
    })
  }

  componentDidMount(){
    if(newData.pending){
      this.setState({"tableData": newData.data});
      newData.pending = false;
    }
  }

  componentWillMount(){
    checkAuth()
  }

  componentDidMount(){
    document.getElementById("table").getElementsByTagName('input')[0].placeholder = "Search Table . ."
  }

  handleChange(value){
    console.log(arguments)
  }

  handleInput(name, value) {
    this.setState({[name]: value});
  }

  handleModal(){
    this.setState({showModal: true});
  }

  handleSubmit(){
  console.log("Checking Submit");
  
  if (this.state.asin.length !== 10) {
    this.setState({err_asin: "ASIN must be 10 characters"})
  } else {
    this.setState({showModal: !this.state.showModal});

      let inventory = {};
      inventory.asin = this.state.asin;
      inventory.purchase_price = this.state.purchase_price;
      inventory.purchase_date = this.state.purchase_date;
      inventory.quantity = this.state.quantity;
      addUserInventory(inventory);

      this.setState({
        showModal: false,
        amzn_asin: null,
        purchase_price: null,
        purchase_quantity: null,
        purchase_date: null
      })
    console.log("INVENTORY OBJ:", inventory);
    console.log("STATE:", this.state);
    }
  }

  cancelModal(){
    this.setState({
      showModal: false,
      amzn_asin: null,
      purchase_price: null,
      purchase_quantity: null,
      purchase_date: null
    })
    console.log("state:",this.state);
  }

  render(){
    return <div>
      <Navbar />
      <Input 
        className="styles__shortInput___xZLmg"
        type='text' 
        label='ASIN number'
        name='name'
        onChange={this.handleChange.bind(this)} 
      />
      <Button 
        className="styles__inlineButton___16AEc"
        label='Add Product' raised floating
        onMouseUp={this.handleModal.bind(this)}
      />
      <Dashboard data={this.state.tableData}/>
      {this.props.children}
      {this.state.showModal 
        ? <Addproduct 
            cancelModal={this.cancelModal.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            handleInput={this.handleInput.bind(this)}
            asin={this.state.asin}
            purchase_price={this.state.purchase_price}
            quantity={this.state.quantity}
            purchase_date={this.state.purchase_date}
            err_asin={this.state.err_asin}
            err_purchase_price={this.state.err_purchase_price}
            err_quantity={this.state.err_quantity}
            err_purchase_date={this.state.err_purchase_date}
          /> 
        : null}
    </div>
  }
}
