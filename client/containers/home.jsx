import React from 'react'
import { LineChart, BarChart } from 'rd3'
import { ProgressBar } from 'react-toolbox'

import { subscribeTo } from '../util/util'
import { checkAuth, processNewInventory } from '../util/requests'
import Home from '../components/home'
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
  }

  componentWillUnmount(){
    mounted = false;
  }

  render(){
    return <div>
      { this.state.graphData.length > 0 && this.state.graphData[0].values.length === 0
       ? <h1 className="styles__centerGraph___PVBDK"> You don't have any inventory! Add items in the Dashboard </h1>
       :<div> 
        <div className="styles__centerGraph___PVBDK">
          <LineChart
            legend={false}
            legendOffset={20}
            data={this.state.graphData}
            width={600}
            height={500}
            viewBoxObject={{
              x: 0,
              y: 0,
              width: 400,
              height: 400
            }}
            title="Inventory Value"
            yAxisLabel="Value"
            xAxisLabel="Time"
            gridHorizontal={true}
            yAxisLabelOffset={50}
          />
          </div>
          <Home data={this.state.notifications}/>
        </div>
      }
    </div>
  }
}
