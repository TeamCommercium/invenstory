import React from 'react'
import Navbar from './navbar.jsx'
import Dashboard from '../components/dashboard.jsx'
import { Button, Input } from 'react-toolbox/lib/index.js'

export default class NavbarContainer extends React.Component{

  constructor(props){
    super(props)
  }

  handleChange(value){
    console.log(arguments)
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
      <Button className="styles__inlineButton___16AEc" label='Add Product' raised floating />
      
      <Dashboard data={[1,2,3,4,5]}/>
      {this.props.children}
    </div>
  }
}