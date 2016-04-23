import React from 'react'
import { Button, Input } from 'react-toolbox'

import Navbar from './navbar'
import Dashboard from '../components/dashboard'
import { subscribeTo } from '../util/util'

const tableData = [
  {
    'id': "sampleId",
    'quantity': 4,
    'purchase_price': 43.34, 
    'amzn_title': 'Bluetooth speakers',
    'amzn_description': 'Like speakers but Bluetooth',
    'amzn_price_fbm': 43.013,
    'amzn_price_fba': 43.65,
    'amzn_rank': 4300,
    'amzn_weight': 1.2,
    'amzn_manuf': 'Bose',
    'amzn_price_time': Date.now()
  },
  {
    'id': "asdfasdf",
    'quantity': 4,
    'purchase_price': 42, 
    'amzn_title': 'stuff',
    'amzn_description': 'Like speakers but Bluetooth',
    'amzn_price_fbm': 43.013,
    'amzn_price_fba': 30.65,
    'amzn_rank': 4300,
    'amzn_weight': 14,
    'amzn_manuf': 'Bose',
    'amzn_price_time': Date.now()
  },
]

export default class NavbarContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      tableData: tableData
    };
  }

  handleChange(value){
    console.log(arguments)
  }

  render(){

    //Sample code for listening to store and triggering a re-render
    // let component = this;
    // subscribeTo("INVENTORY", function(newState){
    //   component.setState({"tableData": newState.inventory.inventory});
    // })

    return <div>
      <Navbar />
      <Input 
        className="styles__shortInput___xZLmg"
        type='text' 
        label='ASIN number'
        name='name'
        onChange={this.handleChange.bind(this)} 
      />
      <Button className="styles__inlineButton___16AEc" label='Add Product' raised floating />
      
      <Dashboard data={this.state.tableData}/>
      {this.props.children}
    </div>
  }
}

