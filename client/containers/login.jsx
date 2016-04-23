import React from 'react'
import Login from '../components/login.jsx'
import { redirect } from '../util/util.jsx'


export default class LoginContainer extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    // fetch('http://localhost:8080/user/me')
    // .then(function(response) {     
    //   console.log("Authentication response props", response)
    //   if (response.status <= 400) {
    //     redirect("/home")();
    //   }
    // })
       

    return <div>
      <Login />
      {this.props.children}
    </div>
  }
}