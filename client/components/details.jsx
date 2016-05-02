import React from 'react'
import { Table } from 'reactable'
import { Button, Input } from 'react-toolbox'
import { LineChart } from 'rd3'

import Details from './details'

export default ({data, hideDetails, deleteAll, confirmShip, err_quantity, handleQuantityChange, quantity }) =>
data.amzn_asin
? <div className="styles__detailDisplay___2K0QU">
  <img src={data.amzn_thumb_url} style={{height:200, width: 200, zIndex:-1, display: "inline", float: "right", marginRight:60}} />
  <Button label='Close' raised floating inverse onMouseUp={hideDetails} />
  <Button className="" label='Delete all' raised floating primary onMouseUp={deleteAll.bind(null, data.id)} />
  <Input 
    className="styles__shortInputField___3ucFK"
    type='number' 
    label='Ship qty'
    name='quantity'
    value={quantity}
    error={err_quantity}
    onChange={handleQuantityChange.bind(this)} 
  />
  <Button className="" label='Ship' raised floating primary onMouseUp={confirmShip.bind(null, data.id )} />
  <h1> {data.amzn_title} </h1>
  <div> {data.amzn_description} </div>
  <div> Weight: {data.amzn_weight} </div>
  <div> Rank: {data.amzn_sales_rank} </div>
  <div> ASIN: {data.amzn_asin} </div>
</div>
: null

//   <Button className="" label='Edit' raised floating primary onMouseUp={function(){}} />
//   <Button className="" label='Add' raised floating primary onMouseUp={function(){}} />
/*

  {
    "amzn_weight":1,
    "amzn_asin":"B002HFHFCC",
    "amzn_price_fba":169.95,
    "amzn_sales_rank":23423,
    "amzn_manufacturer":"LEGO",
    "avg_purchase_price":37.88,"quantity":4
    "amzn_price_fbm":165.18,"seller_sku":"21004",
    "id":87,
    "amzn_title":"LEGO Architecture Solomon R. Guggenheim Museum (21004)",
    "amzn_thumb_url":"http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg",
    "amzn_description":"Replica of real-world architectural landmark Solomon R. Guggenheim museum",
  }

 */
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
