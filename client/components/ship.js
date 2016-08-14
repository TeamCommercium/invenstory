import React from 'react';
import { Button, Dialog, Slider } from 'react-toolbox';

const ShipComponent = (props) => (
  <Dialog
    active={props.active}
    type={props.modalSize}
    onOverlayClick={props.handleShipModal}
  >
    <div className=''>
      <h3 className='styles__centerBlack___2j9F5'>
        Select <span style={{color: 'red'}}>SHIP QUANTITY</span>
      </h3>
      <h4 style={{textAlign: 'center'}}>{props.data.amzn_title}</h4>
      <img
        alt='thumbnail'
        src={props.data.amzn_thumb_url}
        style={{width: 'auto', height: 100, padding: 0, display: 'block', margin: 'auto'}}
      />

      <h4 className='styles__centerBlack___2j9F5'>SKU: {props.data.seller_sku}</h4>
      <h4 className='styles__centerBlack___2j9F5'>Current Unit Value: ${props.data.amzn_price_fba || props.data.amzn_price_fbm}</h4>
      <h4 className='styles__centerBlack___2j9F5'>Current Quantity: {props.data.quantity}</h4>
      <h4 className='styles__centerBlack___2j9F5'>
        Gain: <span style={{color: 'green'}}>{props.data.profit}%</span>
      </h4>
      <div className='contianer'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='styles__shipInfo___1FFPQ col-md-4 col-xs-6'>Total Cost: </div>
            <div className='col-md-1 text-left'>{`$${(props.data.avg_purchase_price * props.ship_quantity).toFixed(2)}`}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='styles__shipInfo___1FFPQ col-md-4 col-xs-6'>Total Value: </div>
            <div className='col-md-1 text-left'>${((props.data.amzn_price_fba || props.data.amzn_price_fbm) * props.ship_quantity).toFixed(2)}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='styles__shipInfo___1FFPQ col-md-4 col-xs-6'>Net Gain: </div>
            <div className='col-md-1 text-left'>${(((props.data.amzn_price_fba || props.data.amzn_price_fbm) - props.data.avg_purchase_price) * props.ship_quantity).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
    <Slider
      className='styles__detailSlider___317hh'
      snaps={true}
      pinned={false}
      min={0}
      max={props.data.quantity}
      step={1}
      editable={true}
      value={Number(props.ship_quantity) || 0}
      onChange={val => props.handleQuantityChange(val)}
    />
    <div className='text-center'>
      <Button
        className='styles__inlineButton___16AEc'
        label='Ship'
        onMouseUp={() => props.confirmShip(props.ship_quantity, props.data.id)}
        raised floating primary
      />
      <Button
        className='styles__inlineButton___16AEc'
        label='Cancel'
        onMouseUp={props.handleShipModal}
        raised floating
      />
    </div>
  </Dialog>
);

ShipComponent.propTypes = {
  data: React.PropTypes.object,
  active: React.PropTypes.bool,
  modalSize: React.PropTypes.string,
  ship_quantity: React.PropTypes.number,
  columnNames: React.PropTypes.array,
  handleShipModal: React.PropTypes.func,
  confirmShip: React.PropTypes.func,
  handleQuantityChange: React.PropTypes.func
};

export default ShipComponent;

