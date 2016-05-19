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
        column: "SKU",
        sortFunction: "CaseInsensitive"
      },
      {
        column: "ASIN",
        sortFunction: "CaseInsensitive"
      },
      {
        column: "Title",
        sortFunction: "CaseInsensitive"
      },
      {
        column: "QTY",
        sortFunction: function(a, b){
          return b-a
        }
      },
      {
        column: "Cost",
        sortFunction: function (a, b) {
          return Number(b.slice(1)) - Number(a.slice(1))
        }
      },
      {
        column: "FBM Price",
        sortFunction: function (a, b) {
          return Number(b.slice(1)) - Number(a.slice(1))
        }
      },
      {
        column: "FBA Price",
        sortFunction: function (a, b) {
          return Number(b.slice(1)) - Number(a.slice(1))
        }
      },
      {
        column: "Total Cost",
        sortFunction: function (a, b) {
          return Number(b.slice(1)) - Number(a.slice(1))
        }
      },
      {
        column: "Total Value",
        sortFunction: function (a, b) {
          return Number(b.slice(1)) - Number(a.slice(1))
        }
      },
      {
        column: "ROI",
        sortFunction: function (a, b) {
          return Number(b.slice(0, b.length - 1)) - Number(a.slice(0, a.length - 1))
        }
      }
      // ...columnNames
    ]}
    defaultSort={{
      column: "Title",
      direction: "desc"
    }}
  />
</div>
