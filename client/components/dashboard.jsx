import React from 'react'
import { Table } from 'reactable'
import { Switch, Dropdown, Button, Input, RadioGroup, RadioButton } from 'react-toolbox'

let columnNames = [
  "Qty",
  "Title",
  "Purchase ($)",
  "Description",
  "Amazon ($)",
  "Manufacture",
  "Profit (%)",
  "ASIN",
  "SKU"
  // "Merchant Price",
  // "Weight",
]

export default (props) =>
<div>
  <Table
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
