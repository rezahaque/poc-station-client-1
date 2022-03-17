import React, { useState, useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import image from 'assets/img/icons/spot-illustrations/navbar-vertical.png';
import FalconCloseButton from 'components/common/FalconCloseButton';
import axiosInstance from 'services/axiosInstance';
import AuthContext from 'context/auth-context';

const PurchaseCard = () => {
  const [show, setShow] = useState(true);
  const { contextValue } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    axiosInstance.get('/api/user/logout')
        .then(() => {
            contextValue.logout();
            localStorage.removeItem('user');
            navigate('/login');
        })
  }
  return (
    show && (
      <div className="settings my-3">
        <Card className="p-0 rounded-2 position-relative">
          <Card.Body className="text-center">
            <img src={image} alt="" width={80} />
            <p className="fs--2 mt-2">
              Sorry to see you go
            </p>
            <div className="d-grid gap-2">
              <Button
                size="sm"
                className="btn-purchase"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  );
};

export default PurchaseCard;
