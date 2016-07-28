import { connect } from 'react-redux';

import { CHANGE_TAB } from '../actionTypes';

import { checkAuth } from '../util/requests';

import TabsComponent from '../components/tab';

function mapState(state) {
  return {
    tab: state.tab
  };
}

function mapDispatch(dispatch) {
  checkAuth();
  return {
    handleTabChange: (index) => {
      checkAuth();
      dispatch({ type: CHANGE_TAB, data: index });
    }
  };
}

export default connect(mapState, mapDispatch)(TabsComponent);
