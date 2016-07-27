import React from 'react';
import { List, ListItem, ListSubHeader, Avatar } from 'react-toolbox';

const NotificationsComponent = ({data, visitItem}) => (
  <List className='styles__notificationsList___30gPV' selectable>
    <ListSubHeader caption='Ship Suggestions' />
    {Array.prototype.map.call(data, (cur, index) =>
      <ListItem
        key={index}
        leftIcon={
          <Avatar style={{borderRadius: 0, background: 'white'}}>
            <img alt='thumbnail' src={cur.amzn_thumb_url} />
          </Avatar>
        }
        caption={cur.amzn_title}
        legend={`Current ROI: ${cur.profit}%`}
        onClick={visitItem.bind(null, cur)}
      />
    )}
  </List>
);

NotificationsComponent.propTypes = {
  data: React.PropTypes.array,
  visitItem: React.PropTypes.func
};

export default NotificationsComponent;
