import React from 'react'
import { List, ListItem, ListSubHeader, Button, Input } from 'react-toolbox'

export default ({data, hand}) =>
<div>
   <Input 
    label='Ship qty'
    name='Search Amazon'
    onChange={handleSearchStringChange}
  />
  <List className="list" selectable>
    <ListSubHeader caption='Notifications' />
    {Array.prototype.map.call(data, (cur, index)=>
      <ListItem
        key={index}
        avatar={cur.amzn_thumb_url}
        caption={cur.amzn_title}
        legend={"Profit is at " + cur.profit + "%"}
      />
    )}
  </List>
</div>
// onClick={function(){handleAmazonResultSelection(cur.SOMETHINGSOMETHING_ASIN)}}