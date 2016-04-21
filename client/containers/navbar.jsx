import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from '../components/navbar.jsx'

export default class NavCont extends React.Component{
  render(){
    return <Navbar redirect={redirect} />
  }
}

function redirect(){
  store.dispatch(push('/home'))
}