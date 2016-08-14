import React from 'react';
import { Button, Input, Dialog } from 'react-toolbox';
import SearchModule from '../components/search';

import {
  UPDATE_FORM_PURCHASE_DATE,
  UPDATE_FORM_QUANTITY,
  UPDATE_FORM_PURCHASE_PRICE,
  UPDATE_FORM_SELLER_SKU,
  UPDATE_FORM_ASIN
} from '../actionTypes';

const AddProductComponent = (props) => (
  <Dialog
    className='styles__dialogModal___2q57r'
    type={props.modalSize}
    active={props.active}
    onOverlayClick={props.resetModal}
  >
    <h3 style={{color: 'black', textAlign: 'center'}}>Add Product</h3>
    <SearchModule passedProps={props} />
    <Input
      disabled
      type='text'
      label='Product ASIN'
      name='asin'
      icon='local_offer'
      value={props.asin}
      error={props.err_asin}
      onChange={(newASIN) => props.handleInput(UPDATE_FORM_ASIN, newASIN)}
    />
    <Input
      disabled={props.lock_sku}
      type='text'
      label='Seller SKU'
      name='seller_sku'
      icon='mode_comment'
      maxLength={30}
      value={props.seller_sku}
      error={props.err_seller_sku}
      onChange={(newSKU) => props.handleInput(UPDATE_FORM_SELLER_SKU, newSKU)}
    />
    <Input
      type='number'
      label='Cost Per Unit'
      name='purchase_price'
      icon={<span>$</span>}
      value={props.purchase_price === 0 ? undefined : props.purchase_price}
      error={props.err_purchase_price}
      onChange={(newPrice) => props.handleInput(UPDATE_FORM_PURCHASE_PRICE, newPrice)}
    />
    <Input
      type='number'
      label='Quantity'
      name='quantity'
      icon='equalizer'
      value={props.quantity === 0 ? undefined : props.quantity}
      error={props.err_quantity}
      onChange={(newQty) => props.handleInput(UPDATE_FORM_QUANTITY, newQty)}
    />
    <Input
      type='date'
      label='Date Purchased'
      name='purchase_date'
      icon='date_range'
      value={props.purchase_date}
      error={props.err_purchase_date}
      onChange={(newDate) => props.handleInput(UPDATE_FORM_PURCHASE_DATE, newDate)}
    />
    <div className='addProductButtons text-center'>
      <Button
        className='styles__inlineButton___16AEc'
        label='Submit' raised floating primary
        onMouseUp={() => props.handleSubmit(
          props.asin,
          props.seller_sku,
          props.purchase_date,
          props.purchase_price,
          props.quantity
        )}
      />
      <Button
        className='styles__inlineButton___16AEc'
        label='Cancel' raised floating
        onMouseUp={props.resetModal}
      />
    </div>
  </Dialog>
);

AddProductComponent.propTypes = {
  lock_sku: React.PropTypes.bool,
  seller_sku: React.PropTypes.string,
  err_seller_sku: React.PropTypes.string,
  asin: React.PropTypes.string,
  err_asin: React.PropTypes.string,
  quantity: React.PropTypes.number,
  err_quantity: React.PropTypes.string,
  purchase_date: React.PropTypes.string,
  err_purchase_date: React.PropTypes.string,
  purchase_price: React.PropTypes.number,
  err_purchase_price: React.PropTypes.string,
  modalSize: React.PropTypes.string,
  active: React.PropTypes.bool,
  handleInput: React.PropTypes.func,
  resetModal: React.PropTypes.func,
  handleSubmit: React.PropTypes.func
};

export default AddProductComponent;
