import React from 'react'
import { Chart } from 'react-google-charts'
import { connect } from 'react-redux'

import { UPDATE_DETAIL_DATA, CHANGE_TAB } from '../actionTypes'
import { checkAuth, processNewInventory } from '../util/requests'
import Notifications from '../components/notifications'
import { store } from '../store/initStore'

class HomeContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      barGraphOptions: {},
      parGraphOptions: {}
    }
  }

  componentDidMount(){
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

  visitItem(cur){
    if(typeof cur === 'object'){
      store.smartDispatch(CHANGE_TAB, 1)
      setTimeout(store.smartDispatch.bind(null, UPDATE_DETAIL_DATA, cur), 0)
    }
  }

  render(){

    checkAuth()

    var notifications, dashboard;

    if(this.props.notifications)
      notifications = <Notifications visitItem={this.visitItem} data={this.props.notifications}/>

    if(this.props.graphData.length > 0 && this.props.graphData[1] && this.props.graphData[1].length > 0)
      dashboard = <div> 
        <div className="styles__centerGraph___PVBDK">
          <Chart chartType = "ColumnChart" data = {this.props.graphData} options = {this.state.barGraphOptions} width={"100%"} height={"400px"}  legend_toggle={true} />
        </div>
        <div className="styles__centerGraph___PVBDK">
          <Chart chartType = "PieChart" data = {this.props.pieChartData} options = {this.state.pieChartOptions} width={"100%"} height={"400px"}  legend_toggle={true}/>
        </div>
        { notifications }
      </div>
    else
      dashboard = <h4 className="styles__centerGraph___PVBDK"> Welcome to InvenStory! Please Add Items to your Inventory.</h4>

    return <div>{dashboard}</div>
  }
}


function mapState(state){
  return {
    graphData: state.graphData,
    pieChartData: state.pieChartData,
    notifications: state.notifications
  }
}

function mapDispatch(dispatch){
  return {
    visitItem: (cur)=>{
      if(typeof cur === 'object'){
        store.smartDispatch(CHANGE_TAB, 1)
        setTimeout(store.smartDispatch.bind(null, UPDATE_DETAIL_DATA, cur), 0)
      }
    }
  }
}

export default connect(mapState, mapDispatch)(HomeContainer)
