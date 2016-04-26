import React from 'react'
import { Button, Input } from 'react-toolbox'

import Navbar from '../components/navbar'
import Dashboard from '../components/dashboard'
import { store } from '../store/initStore'
import { subscribeTo, checkAuth, processNewInventory } from '../util/util'

processNewInventory()
    
export default class DashboardContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      tableData: store.getState().tableData
      showModal: false,
      amzn_asin: null,
      purchase_price: null,
      purchase_quantity: null,
      purchase_date: null
    };
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

  handleModal(){
    this.setState({ showModal: true });
  }

  // toggleModal(){
  //   this.setState({ showModal: !this.state.showModal });
  //   console.log("STATE (toggle)", this.state);
  // }

  handleAsin(val){
    console.log("ASIN:", val);
    this.setState({ amzn_asin: [val] });
  }

  handlePrice(val){
    console.log("Price:", val);
    this.setState({ purchase_price: [val] });
  }

  handleQuantity(val){
    console.log("Quantity:", val);
    this.setState({ purchase_quantity: [val] });
  }

  handleDate(val){
    console.log("Date:", val);
    this.setState({ purchase_date: [val] });
  }

  handleSubmit(){
    this.setState({ showModal: !this.state.showModal });
    
    console.log("STATE", this.state);
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

  // handleCancel(){
  //   this.setState({ showModal: !this.state.showModal });
  // }

  render(){


    // Sample code for listening to store and triggering a re-render
    let component = this;
    subscribeTo("tableData", function(newState){
      // component.setState({"tableData": newState.tableData});
    })

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
            handleAsin={this.handleAsin.bind(this)}
            handlePrice={this.handlePrice.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            handleQuantity={this.handleQuantity.bind(this)}
            handleDate={this.handleDate.bind(this)}
          /> 
        : null}
    </div>
  }
}

