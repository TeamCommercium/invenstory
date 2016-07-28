import React from 'react';

import { Layout, Panel, Tabs, Tab } from 'react-toolbox';

import Dashboard from '../containers/dashboard';
import Home from '../containers/home';
import Settings from '../containers/usersettings';

import { logout } from '../util/requests';

export default class TabsComponent extends React.Component {

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
    const tab = this.props.tab;
    const handleTabChange = this.props.handleTabChange;

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

TabsComponent.propTypes = {
  tab: React.PropTypes.number,
  handleTabChange: React.PropTypes.func
};
