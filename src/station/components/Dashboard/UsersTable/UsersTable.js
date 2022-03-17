import React from 'react';
import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { formatDate } from 'station/utils/date';

const getTotal = (data, key) =>
  data.reduce((acc, val) => acc + Number(val[key]), 0);

const UsersTable = ({ item, isLast, setUserEditModalVisibility, setSelectedUser, setDeleteUserVisibility }) => {
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
        {item.email}
      </td>
      <td>
        <Button variant="primary" onClick={() => {
          setUserEditModalVisibility(true);
          setSelectedUser(item);
        }}>Edit</Button>
        <Button variant="danger" className='delete-btn' onClick={() => {
          setDeleteUserVisibility(true);
          setSelectedUser(item.id);
        }}>Delete</Button>
      </td>
    </tr>
  );
};
const DealForeCastTable = ({ data, setUserEditModalVisibility, setSelectedUser, setDeleteUserVisibility }) => {
  return (
    <SimpleBarReact>
      <Table className="fs--1 mb-0">
        <thead className="bg-200 text-800">
          <tr>
            <th className="text-nowrap">Name</th>
            <th className="text-nowrap">Email</th>
            <th className="text-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <UsersTable
              key={item.id}
              item={item}
              isLast={data.length - 1 === index}
              setUserEditModalVisibility={setUserEditModalVisibility}
              setSelectedUser={setSelectedUser}
              setDeleteUserVisibility={setDeleteUserVisibility}
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

UsersTable.propTypes = {
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

DealForeCastTable.propTypes = {
  data: PropTypes.arrayOf(UsersTable.propTypes.item)
};

export default DealForeCastTable;
