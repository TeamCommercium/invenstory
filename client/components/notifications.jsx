import React from 'react'
import { List, ListItem, ListSubHeader, Button, Avatar } from 'react-toolbox'

export default ({data, visitItem}) =>
<List className="styles__notificationsList___30gPV" selectable>
  <ListSubHeader caption='Ship Suggestions' />
  {Array.prototype.map.call(data, (cur, index)=>
    <ListItem
      key={index}
      leftIcon={<Avatar style={{"border-radius": 0, "background": "white"}}><img src={cur.amzn_thumb_url}/></Avatar>}
      // leftIcon={<img src={cur.amzn_thumb_url} width="45px" height="auto"/>}
      caption={cur.amzn_title}
      legend={"Current ROI: " + cur.profit + "%"}
      onClick={visitItem.bind(null, cur)}
    />
  )}
</List>
