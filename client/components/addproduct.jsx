import React from 'react'
import { Button, Input, Dialog } from 'react-toolbox'
import SearchModule from '../components/search'

export default (props) =>
<Dialog active={props.active} onOverlayClick={props.resetModal}>
  <h3 style={{color: "black", fontSize: 32, textAlign: "center"}}> Add Product</h3>
  <SearchModule inherit={props}/>
  <Input 
    className=""
    type='text' 
    label='Product ASIN'
    name='asin'
    icon='local_offer'
    maxLength={10}
    value={props.asin}
    error={props.err_asin}
    onChange={props.handleInput.bind(this, 'asin')} 
  />
  <Input 
    className=""
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
    className=""
    type='number' 
    label='Purchase price per unit'
    name='purchase_price'
    icon={<span>$</span>}
    value={props.purchase_price}
    error={props.err_purchase_price}
    onChange={props.handleInput.bind(this, 'purchase_price')} 
  />
  <Input 
    className=""
    type='number' 
    label='Quantity'
    name='quantity'
    icon='equalizer'
    value={props.quantity}
    error={props.err_quantity}
    onChange={props.handleInput.bind(this, 'quantity')} 
  />
  <Input 
    className=""
    type='date' 
    label='Date Purchased' 
    name='purchase_date'
    icon='date_range'
    value={props.purchase_date}
    error={props.err_purchase_date}
    onChange={props.handleInput.bind(this, 'purchase_date')} 
  />
  <Button
    className=""
    label='Submit' raised floating
    onMouseUp={props.handleSubmit.bind(this)}
  />
  <Button
    className=""
    label='Cancel' raised floating
    onMouseUp={props.resetModal.bind(this)}
  />
</Dialog>
