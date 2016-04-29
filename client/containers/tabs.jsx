import React from 'react'
import { LineChart } from 'rd3'
import { AppBar, Checkbox, IconButton, Button, Input, Layout, Navigation, NavDrawer, Panel, Sidebar, Tabs, Tab } from 'react-toolbox'

import Dashboard from './dashboard'
import Home from './home'

import { CHANGE_TAB } from '../actionTypes'
import { smartDispatch } from '../dispatcher'
import { store } from '../store/initStore'
import { subscribeTo, checkAuth, processNewInventory, redirect, logout } from '../util/util'

export default class TabsContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      tab: store.getState().tab,
    }

    let component = this;
    subscribeTo("tab", function(newState){

      try{
        component.setState({ "tab": newState.tab })
      } catch (e){
        console.log('setState in tabs.jsx failed', e)
        component.state.tab = newState.tab
      }
    })
  }

  handleTabChange(index){
    checkAuth()
    smartDispatch(CHANGE_TAB, index)
  };

  componentWillMount(){
    checkAuth()
  }

  render(){
    return <Tabs index={this.state.tab} onChange={this.handleTabChange.bind(this)}>
        <Tab label='Home'><Home /></Tab>
        <Tab label='Dashboard'><Dashboard /></Tab>
        <Tab label='Logout' onClick={logout}><div></div></Tab>
      </Tabs>
  }
}

// <Button className='styles__logout___3o2E6' label='Logout' onMouseUp={logout} raised primary />
// <IconButton className='styles__settingButton___MrjY-' primary><img style={{width: 35, height: 35}} src="http://i.imgur.com/pVDjxpB.png" /> </IconButton>

