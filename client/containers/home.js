import { connect } from 'react-redux';

import { UPDATE_DETAIL_DATA, CHANGE_TAB } from '../actionTypes';

import { checkAuth } from '../util/requests';
import HomeComponent from '../components/home';

function mapState(state) {
  return {
    graphData: state.graphData,
    pieChartData: state.pieChartData,
    notifications: state.notifications
  };
}

function mapDispatch(dispatch) {
  checkAuth();
  return {
    visitItem: (cur) => {
      if (typeof cur === 'object') {
        dispatch({ type: CHANGE_TAB, data: 1 });
        setTimeout(() =>
          dispatch({ type: UPDATE_DETAIL_DATA, data: cur })
        , 0);
      }
    }
  };
}

export default connect(mapState, mapDispatch)(HomeComponent);
