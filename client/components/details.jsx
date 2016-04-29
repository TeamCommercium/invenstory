import React from 'react'
import { Table } from 'reactable'
import { Switch, Dropdown, Button, Input, RadioGroup, RadioButton } from 'react-toolbox'
import Details from './details'
import { LineChart } from 'rd3'

export default (props) =>
<div>
  {JSON.stringify(props.data)}
</div>
  // <LineChart
  //   data={this.state.graphData}
  //   className="styles__centerGraph___PVBDK"
  //   width={400}
  //   height={400}
  //   viewBoxObject={{
  //     x: 0,
  //     y: 0,
  //     width: 500,
  //     height: 400
  //   }}
  //   title="Inventory Value"
  //   yAxisLabel="Value ($)"
  //   xAxisLabel="Time"
  //   gridHorizontal={true}
  // />
