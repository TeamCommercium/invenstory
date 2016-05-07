import React from 'react'
import { Table } from 'reactable'
import { Switch, Dropdown, Button, Input, RadioGroup, RadioButton } from 'react-toolbox'

export default ({ columnNames, data }) =>
<div className="styles__tableDiv___bKZPU">
  <Table
    id="styles__table___1QENt" 
    data={data}
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
