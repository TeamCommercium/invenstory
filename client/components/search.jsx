import React from 'react'
import { List, ListItem, ListSubHeader, Button, Input } from 'react-toolbox'

/*

  err_quantity={this.state.err_quantity}
  err_purchase_date={this.state.err_purchase_date}
  handleSearchStringChange={this.handleSearchStringChange.bind(this)}
  handleAmazonSearch={this.handleAmazonSearch.bind(this)}
  handleAmazonResultSelection={this.handleAmazonResultSelection.bind(this)}
  handleSearchToggle={this.handleSearchToggle.bind(this)}
  showSearch={this.state.showSearchOption}

 */

export default ({inherit}) =>
<div>
  {inherit.showSearch
   && <div>
     <Input 
      label='Search Amazon'
      name='Search Amazon'
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

