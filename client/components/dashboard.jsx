import React from 'react'
import { Table } from 'Reactable'
import { Switch, Dropdown, Button, Input, RadioGroup, RadioButton } from 'react-toolbox'

import { redirect } from '../util/util'

export default (props) =>
<div>
  <Table
    className="table" 
    id="table" 
    data={props.data}
    filterable={[
      "Quantity",
      "Title",
      "Purchase Price",
      "Description",
      "Amazon Price",
      "Merchant Price",
      "Weight",
      "Manufacture",
    ]} 
    sortable={[
      {
        column: "Title",
        sortFunction: function(a, b){
          // Sort by last name
          var nameA = a.split(' ')
          var nameB = b.split(' ')

          return nameA[1].localeCompare(nameB[1])
        }
      },
      "Quantity",
      "Title",
      "Purchase Price",
      "Description",
      "Amazon Price",
      "Merchant Price",
      "Weight",
      "Manufacture",
    ]}
    defaultSort={{
      column: "Title",
      direction: 'desc'
    }}
  />
</div>
