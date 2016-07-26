import React from 'react';
import { Button, Input, Dialog } from 'react-toolbox';
import SearchModule from '../components/search';

const AddProductComponent = (props) => (
  <Dialog className='styles__dialogModal___2q57r' type={props.modalSize} active={props.active} onOverlayClick={props.resetModal}>
    <h3 style={{color: 'black', textAlign: 'center'}}>Add Product</h3>
    <SearchModule inherit={props} />
    <Input
      disabled
      type='text'
      label='Product ASIN'
      name='asin'
      icon='local_offer'
      value={props.asin}
      error={props.err_asin}
      onChange={props.handleInput.bind(this, 'asin')}
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
      onChange={props.handleInput.bind(this, 'seller_sku')}
    />
    <Input
      type='number'
      label='Cost Per Unit'
      name='purchase_price'
      icon={<span>$</span>}
      value={props.purchase_price}
      error={props.err_purchase_price}
      onChange={props.handleInput.bind(this, 'purchase_price')}
    />
    <Input
      type='number'
      label='Quantity'
      name='quantity'
      icon='equalizer'
      value={props.quantity}
      error={props.err_quantity}
      onChange={props.handleInput.bind(this, 'quantity')}
    />
    <Input
      type='date'
      label='Date Purchased'
      name='purchase_date'
      icon='date_range'
      value={props.purchase_date}
      error={props.err_purchase_date}
      onChange={props.handleInput.bind(this, 'purchase_date')}
    />
    <div className='addProductButtons text-center'>
      <Button
        className='styles__inlineButton___16AEc'
        label='Submit' raised floating primary
        onMouseUp={props.handleSubmit.bind(this)}
      />
      <Button
        className='styles__inlineButton___16AEc'
        label='Cancel' raised floating
        onMouseUp={props.resetModal.bind(this)}
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
  purchase_price: React.PropTypes.string,
  err_purchase_price: React.PropTypes.string,

  modalSize: React.PropTypes.string,
  active: React.PropTypes.bool,
  handleInput: React.PropTypes.func,
  resetModal: React.PropTypes.func,
  handleSubmit: React.PropTypes.func
};

export default AddProductComponent;

