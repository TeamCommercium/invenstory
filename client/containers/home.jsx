import React from 'react'
import { LineChart } from 'rd3'

import { checkAuth } from '../util/util'
import Navbar from '../components/navbar'
import Home from '../components/home'

let lineData = [
  {
    name: "Inventory value",
    values: [ { x: 0, y: 20 }, { x: 24, y: 10 } ]
  },
]

export default class HomeContainer extends React.Component{

  constructor(props){
    super(props)
  }

  componentWillMount(){
    checkAuth()
  }

  render(){
    return <div>
      <Navbar />
      <LineChart
        data={lineData}
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
