import React from 'react';
import { Chart } from 'react-google-charts';
import Notifications from '../components/notifications';

const HomeComponent = ({
  notifications,
  graphData,
  pieChartData,
  visitItem
}) => {
  const pieChartOptions = {
    title: 'Current Inventory Value',
    legend: { position: 'right'},
    is3D: false,
    colors: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51']
  };

  const barGraphOptions = {
    title: 'Current Inventory Performance',
    hAxis: {title: 'SKU'},
    vAxis: {title: 'Value'},
    legend: { position: 'top', maxLines: 3 },
    bar: { groupWidth: '75%' },
    isStacked: false,
    colors: ['#F4A261', '#20B2AA']
  };

  let renderNotifications;
  let renderDashboard;

  if (notifications) {
    renderNotifications = (
      <Notifications
        visitItem={visitItem}
        data={notifications}
      />
    );
  }

  if (graphData.length > 0
    && graphData[1]
    && graphData[1].length > 0) {
    renderDashboard = (
      <div>
        <div className='styles__centerGraph___PVBDK'>
          <Chart
            chartType='ColumnChart'
            data={graphData}
            options={barGraphOptions}
            width={'100%'}
            height={'400px'}
            legend_toggle={true}
          />
        </div>
        <div className='styles__centerGraph___PVBDK'>
          <Chart
            chartType='PieChart'
            data={pieChartData}
            options={pieChartOptions}
            width={'100%'}
            height={'400px'}
            legend_toggle={true}
          />
        </div>
        {renderNotifications}
      </div>
    );
  } else {
    renderDashboard = (
      <h4 className='styles__centerGraph___PVBDK'>
        Welcome to InvenStory! Please Add Items to your Inventory.
      </h4>
    );
  }

  return <div>{renderDashboard}</div>;
};

HomeComponent.propTypes = {
  notifications: React.PropTypes.array,
  graphData: React.PropTypes.array,
  pieChartData: React.PropTypes.array,
  visitItem: React.PropTypes.func
};

export default HomeComponent;
