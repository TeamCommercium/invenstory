import React from 'react';
import { List, ListItem, ListSubHeader, Avatar } from 'react-toolbox';

const NotificationsComponent = ({data, visitItem}) => (
  <div>
    { // Don't render "Ship Suggestions" if there are none
      data.length > 0
      ? <List className='styles__notificationsList___30gPV' selectable>
        <ListSubHeader caption='Ship Suggestions' />
        {data.map((cur, index) =>
          <ListItem
            key={index}
            leftIcon={
              <Avatar style={{borderRadius: 0, background: 'white'}}>
                <img alt='thumbnail' src={cur.amzn_thumb_url} />
              </Avatar>
            }
            caption={cur.amzn_title}
            legend={`Current ROI: ${cur.profit}%`}
            onClick={() => visitItem(cur)}
          />
        )}
      </List>
      : null
    }
  </div>
);

NotificationsComponent.propTypes = {
  data: React.PropTypes.array,
  visitItem: React.PropTypes.func
};

export default NotificationsComponent;
