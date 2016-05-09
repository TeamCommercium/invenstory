import React from 'react'
import { Button, Input, Dialog, Slider } from 'react-toolbox'

export default (props) =>

  <Dialog active={props.active}>
    <div>
      <h2 style={{"text-align": "center", color:"black" }}>Shipping {props.data.seller_sku}</h2>
      <div className="styles__detailSliderInfo___V2gla">TOT Cost: ${(props.data.avg_purchase_price * props.ship_quantity).toFixed(2)}</div>
      <div className="styles__detailSliderInfo___V2gla">TOT Value: ${(props.data.amzn_price_fba * props.ship_quantity).toFixed(2)}</div>
      <div className="styles__detailSliderInfo___V2gla">NET Gain: ${((props.data.amzn_price_fba - props.data.avg_purchase_price) * props.ship_quantity).toFixed(2)}</div>
      <div className="styles__detailSliderInfo___V2gla">ROI: {props.ship_quantity ? props.data.profit : 0}%</div>
    </div>
    <Slider
      className="styles__detailSlider___317hh"
      snaps={true}
      pinned={false}
      min={0}
      max={props.data.quantity}
      step={1}
      editable value={props.ship_quantity || 0}
      onChange={props.handleQuantityChange.bind(this)}
    />
    <div>
      <Button
        className="styles__inlineButton___16AEc"
        label='Ship'
        raised floating primary
        onMouseUp={props.confirmShip.bind(null, props.data.id, props.data.seller_sku, props.data.amzn_price_fba || props.data.amzn_price_fbm)}
      />
      <Button 
        className="styles__inlineButton___16AEc"
        label='Cancel'
        raised floating
        onMouseUp={props.handleShipModal.bind(this)}
      />
    </div>
  </Dialog>

