import React from 'react';
import { Button, Card } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import UsersTable from './UsersTable';
import { dealForecastByOwnerData } from 'data/dashboard/crm';

const Users = ({ 
  users, 
  setUserModalVisibility, 
  setUserEditModalVisibility ,
  setSelectedUser
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="card-header">
        <h6 className="mb-0">All Users</h6>
        <Button variant="success" onClick={() => setUserModalVisibility(true)}>Add User</Button>
      </div>
      <Card.Body className="p-0">
        <UsersTable 
          data={users} 
          setUserEditModalVisibility={setUserEditModalVisibility}
          setSelectedUser={setSelectedUser}
        />
      </Card.Body>
    </Card>
  );
};

export default Users;
