import React from 'react'
import { Button, Dialog} from 'react-toolbox'

export default (props) =>

  <Dialog active={props.active}>
    <h1>You are about to DELETE ALL inventory for:</h1>
    <img src={props.data.amzn_thumb_url} style={{width: 100, height:100, padding:0, margin:0}} />
    <h3>SKU: {props.data.seller_sku}</h3>
    <h3>Quantity: {props.data.quantity}</h3>
    <h4>Title: {props.data.amzn_title}</h4>
    <div>
      <Button
        className="styles__inlineButton___16AEc"
        label='CONFIRM DELETE'
        raised floating primary
        onMouseUp={props.confirmDelete.bind(null, props.data.id)}
      />
      <Button
        className="styles__inlineButton___16AEc"
        label='Cancel'
        raised floating
        onMouseUp={props.handleDeleteModal.bind(this)}
      />
    </div>
  </Dialog>