import React from 'react'
import { Chart } from 'react-google-charts'
import { ProgressBar } from 'react-toolbox'

import { UPDATE_DETAIL_DATA, CHANGE_TAB } from '../actionTypes'
import { smartDispatch } from '../dispatcher'
import { subscribeTo } from '../util/util'
import { checkAuth, processNewInventory } from '../util/requests'
import Notifications from '../components/notifications'
import { store } from '../store/initStore'

/*
  mounted tracks the mounting status of the container and is used to verify that the container
  is mounted before using setState.

  Backlog is used as storage and will store the updates that were ignored if the container wasn't mounted
  when new information came in.

  Backlog is checked and set back to "not pending" whenever componentDidMount is called
 */

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
    mounted = true;

    if(backlog.graphData.pending){
      this.setState({ "graphData": backlog.graphData.payload })
      backlog.graphData.pending = false
    }

    if(backlog.notifications.pending){
      this.setState({ "notifications": backlog.notifications.payload })
      backlog.notifications.pending = false
    }

    const options = {
      title: 'Current Inventory Performance',
      hAxis: {title: 'SKU'},
      vAxis: {title: 'Value'},
      legend: { position: 'top', maxLines: 3 },
      bar: { groupWidth: '75%' },
      isStacked: false
    };

    this.setState({
      'options' : options
    });
  }

  componentWillUnmount(){
    mounted = false;
  }

  visitItem(cur){
    if(typeof cur === 'object'){
      smartDispatch(CHANGE_TAB, 1)
      setTimeout(smartDispatch.bind(null, UPDATE_DETAIL_DATA, cur), 1)
    }
  }

  render(){

    var notifications, dashboard;

    if(this.state.notifications){
      notifications = <Notifications visitItem={this.visitItem} data={this.state.notifications}/>
    }


    if(this.state.graphData.length > 0 && this.state.graphData[1] && this.state.graphData[1].length > 0)
      dashboard = <div> 
        <div className="styles__centerGraph___PVBDK">
          <Chart chartType = "ColumnChart" data = {this.state.graphData} options = {this.state.options} graph_id = "ScatterChart"  width={"100%"} height={"400px"}  legend_toggle={true} />
        </div>
        { notifications }
      </div>
    else
      dashboard = <h1 className="styles__centerGraph___PVBDK"> You don't have any inventory! Add items in the Dashboard </h1>

    return <div>{dashboard}</div>
  }
}
