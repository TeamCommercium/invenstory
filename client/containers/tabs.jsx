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
    return <Layout>
    <NavDrawer active={false}/>
    <Panel>
      <Tabs index={this.state.tab} className={"styles__tabContainer___1UKO5"}onChange={this.handleTabChange.bind(this)} fixed >
        <Tab label='Home' className={"styles__tabsNames___EyUYr"}><Home /></Tab>
        <Tab label='Dashboard' className={"styles__tabsNames___EyUYr"}><Dashboard /></Tab>
        <Tab label='Logout' className="styles__logout___3o2E6" onActive={logout}><div/></Tab>
      </Tabs>
    </Panel>
    <Sidebar pinned={false} width={ 5 }>
        <div><IconButton icon='close'/></div>
        <div style={{ flex: 1 }}>
            <p>Supplemental content goes here.</p>
        </div>
    </Sidebar>
    </Layout>
  }
}
