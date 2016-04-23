import React from 'react'
import Navbar from '../components/navbar.jsx'

export default class NavigationContainer extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return <div>
      <Navbar />
      {this.props.children}
    </div>
  }
}