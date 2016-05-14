import React from 'react'
import { List, ListItem, ListSubHeader, Button } from 'react-toolbox'

export default ({data, visitItem}) =>
<List className="styles__notificationsList___30gPV" selectable>
  <ListSubHeader caption='Ship Suggestions' />
  {Array.prototype.map.call(data, (cur, index)=>
    <ListItem
      key={index}
      avatar={cur.amzn_thumb_url}
      caption={cur.amzn_title}
      legend={"Current ROI: " + cur.profit + "%"}
      onClick={visitItem.bind(null, cur)}
    />
  )}
</List>
