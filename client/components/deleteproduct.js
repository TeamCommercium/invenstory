import React from 'react';
import { Button, Dialog} from 'react-toolbox';

export default (props) => (
  <Dialog
    active={props.active}
    type={props.modalSize}
    onOverlayClick={props.handleDeleteModal}
  >
    <h3 className='styles__centerBlack___2j9F5'>
      You are about to
      <span style={{color: 'red'}}>DELETE ALL</span>
      inventory for:
    </h3>
    <h4 style={{'textAlign': 'center'}}>{props.data.amzn_title}</h4>
    <img
      src={props.data.amzn_thumb_url} 
      style={{width: 'auto', height:100, padding:0, display:'block', margin:'auto'}}
    />
    <h4 className='styles__centerBlack___2j9F5'>SKU: {props.data.seller_sku}</h4>
    <h4 className='styles__centerBlack___2j9F5'>Quantity: {props.data.quantity}</h4>
    <div className='text-center'>
      <Button
        className='styles__inlineButton___16AEc'
        label='CONFIRM DELETE'
        raised floating primary
        onMouseUp={props.confirmDelete.bind(null, props.data.id)}
      />
      <Button
        className='styles__inlineButton___16AEc'
        label='Cancel'
        raised floating
        onMouseUp={props.handleDeleteModal.bind(this)}
      />
    </div>
  </Dialog>
);