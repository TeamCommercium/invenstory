import React from 'react'
import { Chart } from 'react-google-charts'

import { UPDATE_DETAIL_DATA, CHANGE_TAB } from '../actionTypes'
import { checkAuth, processNewInventory } from '../util/requests'
import Notifications from '../components/notifications'
import { store } from '../store/initStore'

export default class HomeContainer extends React.Component{

  constructor(props){
    super(props)
    this.mounted = false;
    this.state = {
      graphData: store.getState().graphData,
      pieChartData: store.getState().pieChartData,
      notifications: store.getState().notifications
    }

    store.register("home", ["notifications", "graphData", "pieChartData"], this)
  }

  componentWillMount(){
    checkAuth()
  }

  componentDidMount(){
    store.syncWithStore("home", ["notifications", "graphData", "pieChartData"], this)

    const barGraphOptions = {
      title: 'Current Inventory Performance',
      hAxis: {title: 'SKU'},
      vAxis: {title: 'Value'},
      legend: { position: 'top', maxLines: 3 },
      bar: { groupWidth: '75%' },
      isStacked: false,
      colors: ['#F4A261', '#20B2AA']
    };

    const pieChartOptions = {
      title: 'Current Inventory Value',
      legend: { position: 'right'},
      is3D: false,
      colors: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51']
    };

    this.setState({
      'barGraphOptions' : barGraphOptions,
      'pieChartOptions' : pieChartOptions
    });
  }

  componentWillUnmount(){
    store.unMounting("home", this)
  }

  visitItem(cur){
    if(typeof cur === 'object'){
      store.smartDispatch(CHANGE_TAB, 1)
      setTimeout(store.smartDispatch.bind(null, UPDATE_DETAIL_DATA, cur), 0)
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
          <Chart chartType = "ColumnChart" data = {this.state.graphData} options = {this.state.barGraphOptions} width={"100%"} height={"400px"}  legend_toggle={true} />
        </div>
        <div className="styles__centerGraph___PVBDK">
          <Chart chartType = "PieChart" data = {this.state.pieChartData} options = {this.state.pieChartOptions} width={"100%"} height={"400px"}  legend_toggle={true}/>
        </div>
        { notifications }
      </div>
    else
      dashboard = <h4 className="styles__centerGraph___PVBDK" style={{}}> Welcome to InvenStory! Please add Inventory in the Dashboard.</h4>

    return <div>{dashboard}</div>
  }
}
