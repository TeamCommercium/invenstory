import React from 'react'

import Login from '../components/login'
import { redirect } from '../util/util'       
 
export default class LoginContainer extends React.Component{

  constructor(props){
    super(props)
  }

  render(){

    return <div>
      <Login />
      {this.props.children}
    </div>
  }
}