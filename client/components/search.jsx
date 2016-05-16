import React from 'react'
import { List, ListItem, ListSubHeader, Button, Input, Avatar } from 'react-toolbox'

export default ({inherit}) =>
<div>
  {inherit.showSearch
   && <div>
     <Input 
      label='Product Search'
      name='Search Amazon'
      icon='search'
      value={inherit.searchString}
      onChange={inherit.handleSearchStringChange}
    />

    { inherit.searchResults && inherit.searchResults.length > 0
     ? <List className="list" selectable>
        <ListSubHeader caption='Results' />
        {Array.prototype.map.call(inherit.searchResults, (cur, index)=>
          <ListItem
            key={index}
            leftIcon={<Avatar style={{"borderRadius": 0, "background": "white"}}><img src={cur.amzn_thumb_url}/></Avatar>}
            caption={cur.amzn_title && cur.amzn_title.slice(0,50)}
            legend=""
            onClick={function(){inherit.handleAmazonResultSelection(cur.amzn_asin)}}
          />
        )}
      </List>
     : null}
     </div>}
      <div className='text-center'>
        <Button 
          className="styles__inlineButton___16AEc"
          label='Search' raised floating
          onMouseUp={inherit.handleAmazonSearch}
        />
      </div>
</div>
