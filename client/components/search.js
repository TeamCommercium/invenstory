import React from 'react';
import { List, ListItem, ListSubHeader, Button, Input, Avatar } from 'react-toolbox';

const SearchComponent = ({ passedProps }) => (
  <div>
    {passedProps.showSearch &&
      <div>
        <Input
          label='Product Search'
          name='Search Amazon'
          icon='search'
          value={passedProps.searchString}
          onChange={passedProps.handleSearchStringChange}
        />

        {passedProps.searchResults && passedProps.searchResults.length > 0
        ? <List className='list' selectable>
          <ListSubHeader caption='Results' />
          {Array.prototype.map.call(passedProps.searchResults, (cur, index) =>
            <ListItem
              key={index}
              leftIcon={
                <Avatar style={{borderRadius: 0, background: 'white'}}>
                  <img alt='thumbnail' src={cur.amzn_thumb_url} />
                </Avatar>
              }
              caption={cur.amzn_title && cur.amzn_title.slice(0, 50)}
              legend=''
              onClick={() => passedProps.handleAmazonResultSelection(cur.amzn_asin)}
            />
          )}
        </List>
        : null
        }
      </div>
    }
    <div className='text-center'>
      <Button
        className='styles__inlineButton___16AEc'
        label='Search'
        onMouseUp={() => passedProps.handleAmazonSearch(passedProps.searchString)}
        raised floating
      />
    </div>
  </div>
);

SearchComponent.propTypes = {
  passedProps: React.PropTypes.object
};

export default SearchComponent;

