import React from 'react'
import { Button, Input, Dialog } from 'react-toolbox'
// import Dashboard from '../containers/dashboard'


export default (props) =>

  <div>
    <Dialog active={true} title="ADD PRODUCT">
      {console.log("props:", props)}
      <Input 
        className=""
        type='text' 
        label='ASIN for product'
        name='amzn_asin'
        required={true}
        onChange={ props.handleAsin.bind(this) } 
      />
      <Input 
        className=""
        type='number' 
        label='Purchase Price'
        name='purchase_price'
        onChange={ props.handlePrice.bind(this) } 
      />
      <Input 
        className=""
        type='number' 
        label='Quantity'
        name='purchase_quantity'
        onChange={ props.handleQuantity.bind(this) } 
      />
      <Input 
        className=""
        type='date' 
        label='Date Purchased'
        name='purchase_date'
        onChange={ props.handleDate.bind(this) } 
      />
      <Button
        className=""
        label='Submit' raised floating
        onMouseUp={ props.handleSubmit.bind(this) }
      />
      <Button
        className=""
        label='Cancel' raised floating
        onMouseUp={ props.cancelModal.bind(this) }
      />
    </Dialog>
  </div>
// })
