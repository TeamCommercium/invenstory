import React from 'react';
import { Layout, Panel, Tabs, Tab } from 'react-toolbox';

import { connect } from 'react-redux';

import Dashboard from './dashboard';
import Home from './home';
import Settings from './usersettings';

import { CHANGE_TAB } from '../actionTypes';
import { store } from '../store/initStore';
import { checkAuth, logout } from '../util/requests';


// To prevent flicker when not authorized on initial page load
checkAuth();

class TabsContainer extends React.Component {

  constructor(props) {
    super(props);
    // after window resize, redraw graph to fit

    if (window) {
      window.onresize = () => {
        clearTimeout(resizeEnd);
        let resizeEnd = setTimeout(() => {
          this.forceUpdate();
        }, 100);
      };
    }
  }

  render() {
    checkAuth();
    let tab = this.props.tab;
    let handleTabChange = this.props.handleTabChange;

    return (
      <Layout>
        <Panel>
          <Tabs index={tab} className="styles__tabContainer___1UKO5" onChange={handleTabChange} fixed>
            <Tab label='Home' className="styles__tabsNames___EyUYr"><Home /></Tab>
            <Tab label='Inventory' className="styles__tabsNames___EyUYr"><Dashboard /></Tab>
            <Tab label='Logout' className="styles__logout___3o2E6 styles__tabsNames___EyUYr" onActive={logout}><div /></Tab>
            <Tab label="Settings" className="styles__tabsNames___EyUYr"><Settings /></Tab>
          </Tabs>
        </Panel>
      </Layout>
    );
  }
}

TabsContainer.propTypes = {
  tab: React.PropTypes.number,
  handleTabChange: React.PropTypes.func
};

function mapState(state) {
  return {
    tab: state.tab
  };
}

function mapDispatch(dispatch) {
  return {
    handleTabChange: (index) => {
      checkAuth();
      store.smartDispatch(CHANGE_TAB, index);
    }
  };
}

export default connect(mapState, mapDispatch)(TabsContainer);
