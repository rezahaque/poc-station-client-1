import React from 'react';
import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { formatDate } from 'station/utils/date';
import './StationsTable.scss';

const getTotal = (data, key) =>
  data.reduce((acc, val) => acc + Number(val[key]), 0);

const StationsTableRow = ({ 
  item, 
  isLast, 
  setEditModalVisibility,
  setDeleteStationVisibility, 
  setSelectedStation 
}) => {
  const userId = JSON.parse(localStorage.getItem('user')).id
  return (
    <tr>
      <td
        className={classNames(
          'align-middle font-sans-serif fw-medium text-nowrap',
          {
            'border-bottom-0': isLast
          }
        )}
      >
        <Link to="/e-commerce/customer-details">{item.name}</Link>
      </td>
      <td
        className={classNames('align-middle', {
          'border-bottom-0': isLast
        })}
      >
        {item.comment}
      </td>
      <td
        className={classNames('align-middle', {
          'border-bottom-0': isLast
        })}
      >
        {formatDate(item.createdAt)}
      </td>
      <td>
          <Button variant="primary" onClick={() => {
            setEditModalVisibility(true);
            setSelectedStation(item);
          }}>Edit</Button>
          <Button variant="danger" className='delete-btn' onClick={() => {
            setDeleteStationVisibility(true);
            setSelectedStation(item.id);
          }}>Delete</Button>
      </td>
    </tr>
  );
};
const StationsTable = ({ 
  data, 
  setDeleteStationVisibility, 
  setSelectedStation,
  setEditModalVisibility
}) => {
  return (
    <SimpleBarReact>
      <Table className="fs--1 mb-0">
        <thead className="bg-200 text-800">
          <tr>
            <th className="text-nowrap">Name</th>
            <th className="text-nowrap">Comment</th>
            <th className="text-nowrap">Created At</th>
            <th className="text-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <StationsTableRow
              key={item.id}
              item={item}
              isLast={data.length - 1 === index}
              setEditModalVisibility={setEditModalVisibility}
              setDeleteStationVisibility={setDeleteStationVisibility}
              setSelectedStation={setSelectedStation}
            />
          ))}
        </tbody>
        {/* <tfoot className="bg-light">
          <tr className="text-700 fw-bold">
            <th>Total</th>
            <th className="text-center">${getTotal(data, 'qualifiedItem')}</th>
            <th className="text-center">${getTotal(data, 'appointment')}</th>
            <th className="text-center">${getTotal(data, 'contactSent')}</th>
            <th className="pe-card text-end">${getTotal(data, 'closedWon')}</th>
          </tr>
        </tfoot> */}
      </Table>
    </SimpleBarReact>
  );
};

StationsTableRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    owner: PropTypes.string.isRequired,
    qualifiedItem: PropTypes.number.isRequired,
    appointment: PropTypes.number.isRequired,
    closedWon: PropTypes.number.isRequired,
    contactSent: PropTypes.number.isRequired
  }),
  isLast: PropTypes.bool.isRequired
};

StationsTable.propTypes = {
  data: PropTypes.array
};

export default StationsTable;
