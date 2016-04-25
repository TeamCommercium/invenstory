import React from 'react'
import { Button, Input, Dialog } from 'react-toolbox'


export default (props) =>

  handleChange(value){
    console.log(arguments)
  }

  <div>
    <Dialog title="ADD PRODUCT">
      <Input 
        className=""
        type='text' 
        label='Please type in ASIN for product'
        name='amzn_asin'
        onChange={this.handleChange.bind(this)} 
      />
      <Input 
        className=""
        type='number' 
        label='Purchase Price'
        name='purchase_price'
        onChange={this.handleChange.bind(this)} 
      />
      <Input 
        className=""
        type='number' 
        label='Quantity'
        name='purchase_quantity'
        onChange={this.handleChange.bind(this)} 
      />
      <Input 
        className=""
        type='date' 
        label='Date Purchased'
        name='purchase_date'
        onChange={this.handleChange.bind(this)} 
      />
      <Button className=""
        label='Submit' raised floating
        onMouseUp={   }
      />

    </Dialog>
  </div>
