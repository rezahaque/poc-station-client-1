import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Divider from 'components/common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
import axiosInstance from 'services/axiosInstance';
import AuthContext from 'context/auth-context';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginForm = ({ hasLabel, layout }) => {
  // State
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    // toast.success(`Logged in as ${formData.email}`, {
    //   theme: 'colored'
    // });
    axiosInstance.post('/api/user/login', {
      email: formData.email,
      password: formData.password
    }).then(res => {
      if (res.data.statusCode === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        authContext.contextValue.login();
        navigate("/");
      }
    })
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          {hasLabel && <Form.Label>Email address</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Email address' : ''}
            value={formData.email}
            name="email"
            onChange={handleFieldChange}
            type="email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          {hasLabel && <Form.Label>Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Password' : ''}
            value={formData.password}
            name="password"
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>

        <Form.Group>
          <Button
            type="submit"
            color="primary"
            className="mt-3 w-100"
            disabled={!formData.email || !formData.password}
          >
            Log in
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
};

export default LoginForm;
