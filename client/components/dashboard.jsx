import React from 'react'
import { Table } from 'reactable'
import { Switch, Dropdown, Button, Input, RadioGroup, RadioButton } from 'react-toolbox'

let columnNames = [
  "SKU",
  "ASIN",
  "Title",
  "Description",
  "QTY",
  "Cost",
  "FBM Price",
  "FBA Price",
  "% Gain"
]

// <div className="styles__tableContainer___1">
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
