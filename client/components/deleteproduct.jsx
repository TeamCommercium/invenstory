import React from 'react'
import { Button, Dialog} from 'react-toolbox'

export default (props) =>

  <Dialog active={props.active}>

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