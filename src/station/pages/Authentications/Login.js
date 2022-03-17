import React from 'react';
import LoginForm from 'components/authentication/simple/Login'
import Logo from 'components/common/Logo';

const Login = () => {
    return (
        <div className="login-section container">
            <div className="flex-center min-vh-100 row">
                <div className="col-xxl-4 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                    <Logo />
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default Login;