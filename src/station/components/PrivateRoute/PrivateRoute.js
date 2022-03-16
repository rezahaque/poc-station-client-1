import AuthContext from "context/auth-context";
import { useContext, memo } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = memo(({ children, ...props }) => {
  const { contextValue } = useContext(AuthContext);
  const location = useLocation();

  if (!contextValue.userIsLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
});

export default PrivateRoute;