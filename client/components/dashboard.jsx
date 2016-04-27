import React from 'react'
import { Table } from 'Reactable'
import { Switch, Dropdown, Button, Input, RadioGroup, RadioButton } from 'react-toolbox'

import { redirect } from '../util/util'

let columnNames = [
  "Quantity",
  "Title",
  "Purchase ($)",
  "Description",
  "Amazon ($)",
  "Manufacture",
  "Profit (%)"
  // "Merchant Price",
  // "Weight",
]

export default (props) =>
<div>
  <Table
    className="table" 
    id="table" 
    data={props.data}
    filterable={columnNames} 
    sortable={[
      {
        column: "Title",
        sortFunction: function(a, b){
          return b-a
        }
      },
      ...columnNames
    ]}
    defaultSort={{
      column: "Title",
      direction: 'desc'
    }}
  />
</div>
