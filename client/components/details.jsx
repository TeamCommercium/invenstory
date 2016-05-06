import React from 'react'
import { Table } from 'reactable'
import { Button, Input, Slider } from 'react-toolbox'
import { Chart } from 'react-google-charts'

export default ({historical, options, data, hideDetails, smartAdd, deleteAll, confirmShip, err_quantity, handleQuantityChange, quantity }) =>
<div className="styles__detailDisplay___2K0QU">
  <img className="styles__detailImage___3CFNO" src={data.amzn_thumb_url} />
  <h3 className="styles__detailTitle___2N12_"> {data.amzn_title} </h3>
  <div className="styles__detailDescription___2v665"> {data.amzn_description && data.amzn_description.slice(0,292)} </div>
  <div> Sales Rank: {data.amzn_sales_rank} </div>
  <div> Weight: {data.amzn_weight} lbs</div>
  <div className="styles__detailButtonsDiv___3qeKQ">
  <Button className="styles__detailButton___1aYnt" label='Close' raised floating inverse onMouseUp={hideDetails} />
  <Button className="styles__detailButton___1aYnt" label='Add' raised floating primary onMouseUp={smartAdd.bind(null,data)} />
  <Button className="styles__detailButton___1aYnt" label='Delete all' raised floating primary onMouseUp={deleteAll.bind(null, data.id, data.quantity, data.seller_sku)} />
  <Button className="styles__detailButton___1aYnt" label='Ship' raised floating primary onMouseUp={confirmShip.bind(null, data.id, data.seller_sku, data.amzn_price_fba || data.amzn_price_fbm)} />
  </div>
  
  <div>
    <div className="styles__detailSliderInfo___V2gla">TOT Cost: ${(data.avg_purchase_price * quantity).toFixed(2)}</div>
    <div className="styles__detailSliderInfo___V2gla">TOT Value: ${(data.amzn_price_fba * quantity).toFixed(2)}</div>
    <div className="styles__detailSliderInfo___V2gla">NET Gain: ${((data.amzn_price_fba - data.avg_purchase_price) * quantity).toFixed(2)}</div>
    <div className="styles__detailSliderInfo___V2gla">ROI: {quantity ? data.profit : 0}%</div>
  </div>
  <Slider className="styles__detailSlider___317hh" snaps={true} pinned={false} min={0} max={data.quantity} step={1} editable value={quantity || 0} onChange={handleQuantityChange.bind(this)} />
  <Chart className="styles__detailChart___1CgJr" chartType="LineChart" data={historical} options={options} />

</div>
