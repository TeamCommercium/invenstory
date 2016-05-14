import React from 'react'
import { List, ListItem, ListSubHeader, Button } from 'react-toolbox'

export default ({data, visitItem}) =>
<List className="styles__notificationsList___30gPV" selectable>
  <ListSubHeader caption='Top Performing Items' />
  {Array.prototype.map.call(data, (cur, index)=>
    <ListItem
      style={{borderRadius: 0}}
      key={index}
      avatar={cur.amzn_thumb_url}
      caption={cur.amzn_title}
      legend={"Current ROI: " + cur.profit + "%"}
      onClick={visitItem.bind(null, cur)}
    />
  )}
</List>
