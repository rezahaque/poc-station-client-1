import { createContext } from 'react';

const AuthContext = createContext({
    userIsLoggedIn: false,
    login: () => {},
    logout: () => {},
});

export default AuthContext;