import { routerReducer as routing } from 'react-router-redux';

import { combineReducers } from 'redux';

import tab from './tab';
import detail from './detail';
import tableData from './table';
import graphData from './graph';
import lastDetailId from './lastDetailId';
import pieChartData from './pieChart';
import authenticated from './authentication';
import lastChanged from './lastChanged';
import userSettings from './userSettings';
import notifications from './notification';
import historicalData from './historicalData';
import dashboard from './dashboard';

export default combineReducers({
  tableData,
  graphData,
  pieChartData,
  authenticated,
  lastChanged,
  detail,
  routing,
  notifications,
  tab,
  userSettings,
  historicalData,
  dashboard,
  lastDetailId
});
