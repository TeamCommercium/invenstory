import React from 'react'
import { LineChart } from 'rd3'

import { subscribeTo, checkAuth, processNewInventory } from '../util/util'
import Navbar from '../components/navbar'
import Home from '../components/home'
import { store } from '../store/initStore'

var status = {
  outOfDate: false,
  data: undefined
}

export default class HomeContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      graphData: store.getState().graphData
    }

    let component = this;
    subscribeTo("graphData", function(newState){
      console.log("NEWSTATE", JSON.stringify(newState.graphData))
      status.outOfDate = true;
      status.data = newState.graphData;
    })
  }

  componentDidMount(){
    if(status.outOfDate){
      this.setState({ "graphData": status.data });
      status.outOfDate = false;    
    }
  }

  componentWillMount(){
    checkAuth()
  }

  render(){
    return <div>
      <Navbar />
      <LineChart
        data={this.state.graphData}
        width='100%'
        height={400}
        viewBoxObject={{
          x: 0,
          y: 0,
          width: 500,
          height: 400
        }}
        title="Inventory Value"
        yAxisLabel="Value ($)"
        xAxisLabel="Time"
        gridHorizontal={true}
      />
      <Home />
    </div>
  }
}
