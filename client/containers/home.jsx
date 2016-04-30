import React from 'react'
import { LineChart, BarChart } from 'rd3'
import { ProgressBar } from 'react-toolbox'

import { subscribeTo, checkAuth, processNewInventory } from '../util/util'
import Navbar from '../components/navbar'
import Home from '../components/home'
import { store } from '../store/initStore'

export default class HomeContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      graphData: store.getState().graphData,
      notifications: store.getState().notifications
    }

    let component = this;
    subscribeTo("graphData", function(newState){
      // console.log("NEWSTATE home", JSON.stringify(newState.graphData))

      try{
        component.setState({ "graphData": newState.graphData })
      } catch (e){
        console.log('caught error thingy', e)
      //   component.state.graphData = newState.graphData
      }
    })

    subscribeTo("notifications", function(newState){
      console.log("notifications", JSON.stringify(newState.notifications))

      try{
        component.setState({ "notifications": newState.notifications })
      } catch (e){
        console.log('caught error thingy', e)
      //   component.state.notifications = newState.notifications
      }
    })
  }

  componentWillMount(){
    checkAuth()
  }

  render(){
    return <div>
      { this.state.graphData.length > 0 && this.state.graphData[0].values.length === 0
       ? <h1 className="styles__centerGraph___PVBDK"> You don't have any data! Add some in the Dashboard </h1>
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
          /*<BarChart
            data={this.state.graphData}
            width={500}
            height={200}
            fill={'#3182bd'}
            title='Bar Chart'
            yAxisLabel='Label'
            xAxisLabel='Value'
          />*/
