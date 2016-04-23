import React from 'react'
import { redirect } from '../util/util.jsx'
import { Table } from 'Reactable'
import { Switch, Dropdown, Button, Input, RadioGroup, RadioButton } from 'react-toolbox'


/*
  setPlaceHolder is setTimeout'ed because the component has to finish rendering to the real DOM
  before I can manipulate the placeholder attribute and there is not a native method for the component.

  Should probably be optimized to use React Lifecycle
 */

function setPlaceHolder(){
  setTimeout(function(){
    document.getElementById("table").getElementsByTagName('input')[0].placeholder = "Search Table . ."
  }, 0)
}

// const countries = [
//   { value: 'all', label: 'All Inventory' },
//   { value: 'shipped', label: 'Shipped'},
//   { value: 'notShipped', label: 'Not Shipped' }
// ];
//   <Dropdown
//     auto
//     source={countries}
//     value={'all'}
//   />


[
  {
    'id': "sampleId",
    'quantity': 4,
    'purchase_price': 43.34, 
    'amzn_title': 'Bluetooth speakers',
    'amzn_description': 'Like speakers but Bluetooth',
    'amzn_price_fbm': 43.013,
    'amzn_price_fba': 43.65,
    'amzn_rank': 4300,
    'amzn_weight': 1.2,
    'amzn_manuf': 'Bose',
    'amzn_price_time': Date.now()
  },
  {
    'id': "asdfasdf",
    'quantity': 4,
    'purchase_price': 42, 
    'amzn_title': 'stuff',
    'amzn_description': 'Like speakers but Bluetooth',
    'amzn_price_fbm': 43.013,
    'amzn_price_fba': 30.65,
    'amzn_rank': 4300,
    'amzn_weight': 14,
    'amzn_manuf': 'Bose',
    'amzn_price_time': Date.now()
  },
]


export default (props) =>
<div>

  <Table
    className="table" 
    id="table" 
    data={tableData}
    filterable={[
      'quantity',
      'amzn_title',
      'purchase_price',
      'amzn_description',
      'amzn_price_fbm',
      'amzn_price_fba',
      'amzn_rank',
      'amzn_weight',
      'amzn_manuf',
      'amzn_price_time'
    ]} 
    sortable={[
      {
        column: 'amzn_title',
        sortFunction: function(a, b){
          // Sort by last name
          var nameA = a.split(' ');
          var nameB = b.split(' ');

          return nameA[1].localeCompare(nameB[1]);
        }
      },
      'quantity',
      'amzn_title',
      'purchase_price',
      'amzn_description',
      'amzn_price_fbm',
      'amzn_price_fba',
      'amzn_rank',
      'amzn_weight',
      'amzn_manuf',
      'amzn_price_time'
    ]}
    defaultSort={{
      column: 'amzn_price_time',
      direction: 'desc'
    }}
  />
  {setPlaceHolder()}
</div>
