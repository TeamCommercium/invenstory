import React from 'react'
import { LineChart } from 'rd3'
import { AppBar, Checkbox, IconButton, Button, Input, Layout, Navigation, NavDrawer, Panel, Sidebar, Tabs, Tab } from 'react-toolbox'

import Dashboard from './dashboard'
import Home from './home'
import Settings from './usersettings'

import { CHANGE_TAB } from '../actionTypes'
import { store } from '../store/initStore'
import { checkAuth, processNewInventory, addUserInventory, logout, getUserInfo } from '../util/requests'

/*
  mounted tracks the mounting status of the container and is used to verify that the container
  is mounted before using setState.

  Backlog is used as storage and will store the updates that were ignored if the container wasn't mounted
  when new information came in.

  Backlog is checked and set back to "not pending" whenever componentDidMount is called
 */

export default class TabsContainer extends React.Component{

  constructor(props){
    super(props)
    this.mounted = false;
    this.state = { tab: store.getState().tab }
    store.register("tabs", ["tab"], this)

    // after window resize, redraw graph to fit
    if(window){
      function resizedw(){
        component.forceUpdate();
      }
      var resizeEnd;
      window.onresize = function(){
        clearTimeout(resizeEnd);
        resizeEnd = setTimeout(resizedw, 100);
      }
    }
  }

  handleTabChange(index){
    checkAuth()
    store.smartDispatch(CHANGE_TAB, index)
  }

  componentWillMount(){
    checkAuth()
  }

  componentDidMount(){
    store.syncWithStore("tabs",["tab"], this)
  }

  componentWillUnmount(){
    store.unMounting("tabs", this)
  }

  render(){
    return <Layout>
        <Panel>
          <Tabs index={this.state.tab} className="styles__tabContainer___1UKO5" onChange={this.handleTabChange.bind(this)} fixed >
            <Tab label='Home' className="styles__tabsNames___EyUYr"><Home /></Tab>
            <Tab label='Dashboard' className="styles__tabsNames___EyUYr"><Dashboard /></Tab>
            <Tab label='Logout' className="styles__logout___3o2E6 styles__tabsNames___EyUYr" onActive={logout}><div/></Tab>
            <Tab label="Settings" className="styles__tabsNames___EyUYr"><Settings /></Tab> 
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
