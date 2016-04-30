import React from 'react'
import { LineChart } from 'rd3'
import { AppBar, Checkbox, IconButton, Button, Input, Layout, Navigation, NavDrawer, Panel, Sidebar, Tabs, Tab } from 'react-toolbox'

import Dashboard from './dashboard'
import Home from './home'

import { CHANGE_TAB } from '../actionTypes'
import { smartDispatch } from '../dispatcher'
import { store } from '../store/initStore'
import { subscribeTo, checkAuth, processNewInventory, redirect, logout } from '../util/util'

let mounted = false;

let backlog = {
  tab: {
    pending: false,
    payload: undefined
  }
};

/*
let mounted = false;

let backlog = {
  graphData: {
    pending: false,
    payload: undefined
  },
  notifications: {
    pending: false,
    payload: undefined
  }
};

export default class HomeContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      graphData: store.getState().graphData,
      notifications: store.getState().notifications
    }

    let component = this;
    subscribeTo("graphData", function(newState){
      if(mounted)
        component.setState({ "graphData": newState.graphData })
      else{
        backlog.graphData.payload = newState.graphData
        backlog.graphData.pending = true
      }
    })

    subscribeTo("notifications", function(newState){
      if(mounted)
        component.setState({ "notifications": newState.notifications })
      else{
        backlog.notifications.payload = newState.notifications
        backlog.notifications.pending = true
      }
    })
  }

  componentWillMount(){
    checkAuth()
  }

  componentDidMount(){
    if(backlog.graphData.pending){
      this.setState({ "graphData": backlog.graphData.payload })
      backlog.graphData.pending = false
    }

    if(backlog.notifications.pending){
      this.setState({ "notifications": backlog.notifications.payload })
      backlog.notifications.pending = false
    }

    mounted = true;
  }

  componentWillUnmount(){
    mounted = false;
  }
*/

export default class TabsContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      tab: store.getState().tab,
    }

    let component = this;
    subscribeTo("tab", function(newState){
      if(mounted)
        component.setState({ "tab": newState.tab })
      else{
        backlog.tab.payload = newState.tab
        backlog.tab.pending = true
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

  componentDidMount(){
    if(backlog.tab.pending && mounted){
      this.setState({ "tab": backlog.tab.payload })
      backlog.tab.pending = false
    }

    mounted = true;
  }

  componentWillUnmount(){
    mounted = false;
  }

  render(){
    return <Layout>
    <Panel>
      <Tabs index={this.state.tab} className="styles__tabContainer___1UKO5" onChange={this.handleTabChange.bind(this)} fixed >
        <Tab label='Home' className="styles__tabsNames___EyUYr"><Home /></Tab>
        <Tab label='Dashboard' className="styles__tabsNames___EyUYr"><Dashboard /></Tab>
        <Tab label='Logout' className="styles__logout___3o2E6 styles__tabsNames___EyUYr" onActive={logout}><div/></Tab>
      </Tabs>
    </Panel>
    </Layout>
  }
}
  // <NavDrawer active={this.state.navDrawer}></NavDrawer>
  // <Sidebar pinned={false} width={ 5 }></Sidebar>
  //   simulateProgress () {

  //         progress: 0,
  //     showProgress: true

  //     { this.state.showProgress && <ProgressBar mode='determinate' min={0} max={100} value={this.state.progress} /> }
  //   this.simulateProgress()  
  //   
  //   var key = setInterval(() => {
  //     if(this.state.progress > 99){
  //       this.setState({showProgress: null})
  //       clearInterval(key)
  //     }
  //     this.setState({progress: this.state.progress + 1})
  //   }, 10);
  // }
