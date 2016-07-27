import React from 'react';
import { Table } from 'reactable';

const TableComponent = ({ columnNames, data }) => (
  <div className='styles__tableDiv___bKZPU'>
    <Table
      id='styles__table___1QENt'
      data={data}
      filterable={columnNames}
      sortable={[
        {
          column: 'SKU',
          sortFunction: 'CaseInsensitive'
        },
        {
          column: 'ASIN',
          sortFunction: 'CaseInsensitive'
        },
        {
          column: 'Title',
          sortFunction: 'CaseInsensitive'
        },
        {
          column: 'QTY',
          sortFunction: (a, b) => b - a
        },
        {
          column: 'Cost',
          sortFunction: (a, b) => Number(b.slice(1)) - Number(a.slice(1))
        },
        {
          column: 'FBM Price',
          sortFunction: (a, b) => Number(b.slice(1)) - Number(a.slice(1))
        },
        {
          column: 'FBA Price',
          sortFunction: (a, b) => Number(b.slice(1)) - Number(a.slice(1))
        },
        {
          column: 'Total Cost',
          sortFunction: (a, b) => Number(b.slice(1)) - Number(a.slice(1))
        },
        {
          column: 'Total Value',
          sortFunction: (a, b) => Number(b.slice(1)) - Number(a.slice(1))
        },
        {
          column: 'ROI',
          sortFunction: (a, b) => Number(b.slice(0, b.length - 1)) - Number(a.slice(0, a.length - 1))
        }
        // ...columnNames
      ]}
      defaultSort={{
        column: 'Title',
        direction: 'desc'
      }}
    />
  </div>
);

TableComponent.propTypes = {
  columnNames: React.PropTypes.array,
  data: React.PropTypes.array
};

export default TableComponent;
