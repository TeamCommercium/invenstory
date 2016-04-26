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
      <Button className="styles__inlineButton___16AEc" label='Add Product' raised floating />
      
      <Dashboard data={this.state.tableData}/>
      {this.props.children}
    </div>
  }
}

