import React from 'react';
import { Button, Dialog} from 'react-toolbox';

const DeleteProductComponent = ({
  active,
  modalSize,
  handleDeleteModal,
  data,
  confirmDelete
}) => (
  <Dialog
    active={active}
    type={modalSize}
    onOverlayClick={handleDeleteModal}
  >
    <h3 className='styles__centerBlack___2j9F5'>
      You are about to
      <span style={{color: 'red'}}> DELETE ALL </span>
      inventory for:
    </h3>
    <h4 style={{textAlign: 'center'}}> {data.amzn_title} </h4>
    <img
      alt='thumbnail'
      src={data.amzn_thumb_url}
      style={{ width: 'auto', height: 100, padding: 0, display: 'block', margin: 'auto'}}
    />
    <h4 className='styles__centerBlack___2j9F5'>SKU: {data.seller_sku}</h4>
    <h4 className='styles__centerBlack___2j9F5'>Quantity: {data.quantity}</h4>
    <div className='text-center'>
      <Button
        className='styles__inlineButton___16AEc'
        label='CONFIRM DELETE'
        raised floating primary
        onMouseUp={() => confirmDelete(data.id)}
      />
      <Button
        className='styles__inlineButton___16AEc'
        label='Cancel'
        raised floating
        onMouseUp={handleDeleteModal}
      />
    </div>
  </Dialog>
);

DeleteProductComponent.propTypes = {
  data: React.PropTypes.object,
  modalSize: React.PropTypes.string,
  active: React.PropTypes.bool,
  handleDeleteModal: React.PropTypes.func,
  confirmDelete: React.PropTypes.func
};

export default DeleteProductComponent;

