import React from 'react';
import { Card } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import UsersTable from './UsersTable';
import { dealForecastByOwnerData } from 'data/dashboard/crm';

const Users = ({ users }) => {
  return (
    <Card className="overflow-hidden">
      <FalconCardHeader title="All Users" titleTag="h6" />
      <Card.Body className="p-0">
        <UsersTable data={users} />
      </Card.Body>
    </Card>
  );
};

export default Users;
