import React from 'react'
import { Link, browserHistory } from 'react-router'
import { redirect } from '../util/util.jsx'
import { Table } from 'Reactable'
import { Switch, Dropdown, Button, Input, RadioGroup, RadioButton } from 'react-toolbox'

function setTheGoddamnPlaceHolder(){
  setTimeout(function(){
    document.getElementById("table").getElementsByTagName('input')[0].placeholder = "Search Table . ."
  }, 0)
}

const countries = [
  { value: 'all', label: 'All Inventory' },
  { value: 'shipped', label: 'Shipped'},
  { value: 'notShipped', label: 'Not Shipped' }
];

export default (props) =>
<div>
  <Dropdown
    auto
    source={countries}
    value={'all'}
  />

  <Table
    className="table" 
    id="table" 
    data={
      [
        {'State': 'New York', 'Description': 'this is some text', 'Tag': 'new'},
        {'State': 'New Mexico', 'Description': 'lorem ipsum', 'Tag': 'old'},
        {'State': 'Colorado', 'Description': 'new description that shouldn\'t match filter', 'Tag': 'old'},
        {'State': 'Alaska', 'Description': 'bacon', 'Tag': 'renewed'},
      ]
    }
    filterable={
      [
        'State', 
        'Tag'
      ]
    } 
    sortable={
      [
        {
          column: 'State',
          sortFunction: function(a, b){
            // Sort by last name
            var nameA = a.split(' ');
            var nameB = b.split(' ');

            return nameA[1].localeCompare(nameB[1]);
          }
        },
        'State',
        'Description'
      ]
    }
    defaultSort={{
      column: 'State',
      direction: 'desc'
    }}
  />
  {setTheGoddamnPlaceHolder()}
</div>
