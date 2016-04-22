import React from 'react'
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import { AppBar, Button, Navigation, Input } from 'react-toolbox/lib/index.js'
import NavbarContainer from './navbar.jsx'
import DataViz from '../components/dataVisualizations.jsx'

export default (props) =>
<div>
  <NavbarContainer />
  {props.children}
  <DataViz />

  <List className="list" selectable>
    <ListSubHeader caption='Notifications' />
    <ListItem
      avatar='http://www.gadgetreview.com/wp-content/uploads/2014/02/LEGO-7784-Batmobile-Ultimate-Collectors-Edition-Open.jpg'
      caption='Batmobile LEGO set'
      legend="Price went up 20% since you last checked"
      rightIcon={<Button label='Peek' onMouseUp={function(){console.log("clicked")}} raised floating />}
    />
    <ListItem
      avatar='http://images.brickset.com/sets/images/10188-1.jpg?200807260532'
      caption='DeathStar LEGO set'
      legend="Profit margin is as 150%"
      rightIcon={<Button label='Peek' onMouseUp={function(){console.log("clicked")}} raised floating />}
    />
    <ListItem
      avatar='https://dp1eoqdp1qht7.cloudfront.net/community/blogs/1/2133006-o_1a0slu9hp1ed2qrf1v9h15892vja.jpg'
      caption='Doctor Who LEGO set'
      legend="Competition lowered their prices"
      rightIcon={<Button label='Peek' onMouseUp={function(){console.log("clicked")}} raised floating />}
    />
  </List>
</div>