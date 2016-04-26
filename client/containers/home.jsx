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
      lineData: store.getState().graphData
    }
  }

  componentWillMount(){
    checkAuth()
  }

  render(){
    return <div>
      <Navbar />
      <LineChart
        data={this.state.lineData}
        width='100%'
        height={400}
        viewBoxObject={{
          x: 0,
          y: 0,
          width: 500,
          height: 400
        }}
        title="Inventory Value"
        yAxisLabel="Altitude"
        xAxisLabel="Elapsed Time (sec)"
        gridHorizontal={true}
      />
      <Home />
    </div>
  }
}
