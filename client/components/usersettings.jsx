import React from 'react'
import { Button, Dialog, Input} from 'react-toolbox'


export default (props) =>
  <Dialog active={props.active} onOverlayClick={props.resetModal}>
    <h3 style={{color: "black", fontSize: 32, textAlign: "center"}}> Settings </h3>
    <Button
      className=""
      label="Save" raised floating
      onMouseUp={props.resetModal.bind(this)}
    />
    <Button
      className=""
      label="Cancel" raised floating
      onMouseUp={props.resetModal.bind(this)}
    />

  </Dialog>