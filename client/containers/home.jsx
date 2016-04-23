import React from 'react'
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox, AppBar, Button, Navigation, Input } from 'react-toolbox'
import NavbarContainer from './navbar.jsx'
import {LineChart} from 'rd3'

var lineData = [
  {
    name: "Inventory value",
    values: [ { x: 0, y: 20 }, { x: 24, y: 10 } ],
    // strokeWidth: 3,
    // strokeDashArray: "5,5",
  },
];

export default class HomeContainer extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return <div>
      <NavbarContainer />
      <LineChart
        data={lineData}
        width='100%'
        height={400}
        viewBoxObject={{
          x: 0,
          y: 0,
          width: 500,
          height: 400
        }}
        title="Inventory Value"
        yAxisLabel="Altitude"
        xAxisLabel="Elapsed Time (sec)"
        gridHorizontal={true}
      />

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
  }
}
