import { Navigate, Route, Routes, Redirect } from 'react-router-dom';
import PrivateRoute from 'station/components/PrivateRoute/PrivateRoute';
import Login from 'station/pages/Authentications/Login';
import Signup from 'station/pages/Authentications/Signup';
import Home from 'station/pages/Home/Home';

const Layout = () => {
    return (
        <Routes>
            <Route path="/" element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}

export default Layout;