import React from 'react';
import { Button } from 'react-toolbox';
import { Chart } from 'react-google-charts';

const DetailComponent = ({
  historical,
  options,
  data,
  hideDetails,
  smartAdd,
  handleShipModal,
  handleDeleteModal
}) => (
  <div className='styles__detailDisplay___2K0QU'>
    <img alt='thumbnail' className='styles__detailImage___3CFNO' src={data.amzn_thumb_url} />
    <h3 className='styles__detailTitle___2N12_' style={{display: 'inline', margin: '10px'}}> {data.amzn_title} </h3>
    <Button className='styles__detailCancel___dK0rK' icon='clear' floating mini onMouseUp={hideDetails} />
    <div className='styles__detailDescription___2v665'> {data.amzn_description && data.amzn_description.slice(0, 240)} </div>
    <div> Sales Rank: {data.amzn_sales_rank} </div>
    <div> Weight: {data.amzn_weight} lbs</div>
    <div className='styles__detailButtonsDiv___3qeKQ'>
      <Button
        className='styles__inlineButton___16AEc detailBut'
        label='Delete all'
        onMouseUp={handleDeleteModal}
        raised floating primary
      />
      <Button
        className='styles__inlineButton___16AEc detailBut'
        label='Add' raised floating primary
        onMouseUp={() => smartAdd(data)}
      />
      <Button
        className='styles__inlineButton___16AEc detailBut'
        label='Ship' raised floating primary
        onMouseUp={handleShipModal}
      />
    </div>

    <Chart
      className='styles__detailChart___1CgJr'
      chartType='LineChart'
      data={historical}
      options={options}
    />

  </div>
);

DetailComponent.propTypes = {
  historical: React.PropTypes.array,
  options: React.PropTypes.object,
  data: React.PropTypes.object,
  hideDetails: React.PropTypes.func,
  smartAdd: React.PropTypes.func,
  handleShipModal: React.PropTypes.func,
  handleDeleteModal: React.PropTypes.func
};

export default DetailComponent;
