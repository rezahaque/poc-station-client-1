import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './station/layouts/Layout';
import { isLoggedIn } from "./utils/user";
import AuthContext from 'context/auth-context';
import axiosInstance from 'services/axiosInstance';
import NavbarVertical from "./station/components/Navbar/vertical/NavbarVertical";
import classNames from 'classnames';


const App = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    const controller = new AbortController();

    axiosInstance.get('/api/user/reg-user', {
      signal: controller.signal
    })
      .then(res => {
        const { user } = res.data;
        if(user && Object.keys(user).length > 0) {
          setUserIsLoggedIn(true);
          localStorage.setItem("user", JSON.stringify(user));
        }
      })

    return () => controller.abort();
  }, []);

  const login = () => {
    setUserIsLoggedIn(true);
  };

  const logout = () => {
    setUserIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  const contextValue = {
    login,
    logout,
    userIsLoggedIn,
  };

  const navbarPosition = "vertical"

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AuthContext.Provider value={{ contextValue }}>
        <div className={true ? 'container-fluid' : 'container'}>
          {userIsLoggedIn && (navbarPosition === 'vertical' || navbarPosition === 'combo') && (
            <NavbarVertical />
          )}
            <div className={classNames('content')}>
              <Layout />
            </div>
        </div>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
