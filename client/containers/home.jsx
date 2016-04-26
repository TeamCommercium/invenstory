import React from 'react'
import { LineChart } from 'rd3'

import { checkAuth } from '../util/util'
import Navbar from '../components/navbar'
import Home from '../components/home'
import { store } from '../store/initStore'

export default class HomeContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      graphData: store.getState().graphData
    }
  }

  componentWillMount(){
    checkAuth()
  }

  render(){

    // // Sample code for listening to store and triggering a re-render
    // let component = this;
    // subscribeTo("graphData", function(newState){
    //   component.setState({"graphData": newState.graphData});
    // })

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
