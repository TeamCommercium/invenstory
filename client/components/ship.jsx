import React from 'react'
import { Button, Input, Dialog, Slider } from 'react-toolbox'

export default (props) =>

  <Dialog active={props.active} onOverlayClick={props.handleShipModal}>
    <div className=''>
      <h3 className="styles__centerBlack___2j9F5">Please select <span style={{color: "red"}}>SHIP QUANTITY</span> for:</h3>
      <h4 style={{"textAlign": "center"}}>{props.data.amzn_title}</h4>
      <img 
        src={props.data.amzn_thumb_url} 
        style={{width: 100, height:100, padding:0, display:"block", margin:"auto"}}
      />


      <h4 className="styles__centerBlack___2j9F5">SKU: {props.data.seller_sku}</h4>
      <h4 className="styles__centerBlack___2j9F5">Current Unit Value: ${props.data.amzn_price_fba || props.data.amzn_price_fbm}</h4>
      <h4 className="styles__centerBlack___2j9F5">Current Quantity: {props.data.quantity}</h4>
      <h4 className="styles__centerBlack___2j9F5">
      Gain: <span style={{color: "green"}}>{props.data.profit}%</span></h4>
      <div className='contianer'>
        <div className='row'>
          <div className='col-md-12'>
            <div className="styles__shipInfo___1FFPQ col-md-4 col-xs-6">Total Cost: </div>
            <div className='col-md-1 text-left'>{'$'+(props.data.avg_purchase_price * props.ship_quantity).toFixed(2)}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className="styles__shipInfo___1FFPQ col-md-4 col-xs-6">Total Value: </div>
            <div className='col-md-1 text-left'>${((props.data.amzn_price_fba || props.data.amzn_price_fbm) * props.ship_quantity).toFixed(2)}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className="styles__shipInfo___1FFPQ col-md-4 col-xs-6">Net Gain: </div>
            <div className='col-md-1 text-left'>${(((props.data.amzn_price_fba || props.data.amzn_price_fbm) - props.data.avg_purchase_price) * props.ship_quantity).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
    <Slider
      className="styles__detailSlider___317hh"
      snaps={true}
      pinned={false}
      min={0}
      max={props.data.quantity}
      step={1}
      editable={true}
      value={Number(props.ship_quantity) || 0}
      onChange={props.handleQuantityChange.bind(this)}
    />
    <div className='text-center'>
      <Button
        className="styles__inlineButton___16AEc"
        label='Ship'
        raised floating primary
        onMouseUp={props.confirmShip.bind(null, props.data.id)}
      />
      <Button
        className="styles__inlineButton___16AEc"
        label='Cancel'
        raised floating
        onMouseUp={props.handleShipModal.bind(this)}
      />
    </div>
  </Dialog>

