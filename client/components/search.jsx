import React from 'react'
import { List, ListItem, ListSubHeader, Button, Input } from 'react-toolbox'

export default ({inherit}) =>
<div>
  {inherit.showSearch
   && <div>
     <Input 
      label='Search Amazon'
      name='Search Amazon'
      value={inherit.searchString}
      onChange={inherit.handleSearchStringChange}
    />

    <Button 
        className="styles__inlineButton___16AEc"
        label='Go' raised floating
        onMouseUp={inherit.handleAmazonSearch}
      />

    { inherit.searchResults && inherit.searchResults.length > 0
     ? <List className="list" selectable>
        <ListSubHeader caption='Results' />
        {Array.prototype.map.call(inherit.searchResults, (cur, index)=>
          <ListItem
            key={index}
            avatar={cur.amzn_thumb_url}
            caption={cur.amzn_title && cur.amzn_title.slice(0,35)}
            legend={cur.amzn_description && cur.amzn_description.slice(0,35)}
            onClick={function(){inherit.handleAmazonResultSelection(cur.amzn_asin)}}
          />
        )}
      </List>
     : null}
     </div>}
   <Button 
        className="styles__inlineButton___16AEc"
        label='Search Amazon' raised floating
        onMouseUp={inherit.handleSearchToggle}
      />
</div>
