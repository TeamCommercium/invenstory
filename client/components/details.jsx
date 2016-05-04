import React from 'react'
import { Table } from 'reactable'
import { Button, Input, Slider } from 'react-toolbox'
import { Chart } from 'react-google-charts'

export default ({historical, options, data, hideDetails, deleteAll, confirmShip, err_quantity, handleQuantityChange, quantity }) =>
<div className="styles__detailDisplay___2K0QU">
  <img className="styles__detailImage___3CFNO" src={data.amzn_thumb_url} />
  <h3 className="styles__detailTitle___2N12_"> {data.amzn_title} </h3>
  <div className="styles__detailDescription___2v665"> {data.amzn_description} </div>
  <div> Sales Rank: {data.amzn_sales_rank} </div>
  <div> Weight: {data.amzn_weight} lbs</div>
  <Button className="styles__detailButton___1aYnt" label='Close' raised floating inverse onMouseUp={hideDetails} />
  <Button className="styles__detailButton___1aYnt" label='Edit' raised floating primary onMouseUp={function(){}} />
  <Button className="styles__detailButton___1aYnt" label='Add' raised floating primary onMouseUp={function(){}} />
  <Button className="styles__detailButton___1aYnt" label='Delete all' raised floating primary onMouseUp={deleteAll.bind(null, data.id)} />
  <Button className="styles__detailButton___1aYnt" label='Ship' raised floating primary onMouseUp={confirmShip.bind(null, data.id )} />
  <Slider className="styles__detailSlider___317hh" pinned snaps min={0} max={data.quantity} step={1} editable value={quantity || 0} onChange={handleQuantityChange.bind(this)} />

  <Chart className="styles__detailChart___1CgJr" chartType="LineChart" data={historical} options={options} />

</div>



/*

  <Input 
    className="styles__shortInputField___3ucFK"
    type='number' 
    label=''
    name='quantity'
    value={quantity}
    error={err_quantity}
    onChange={handleQuantityChange.bind(this)} 
  />

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
