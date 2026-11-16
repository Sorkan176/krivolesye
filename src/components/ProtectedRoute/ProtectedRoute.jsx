import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../../context/useAuth.js";


function ProtectedRoute({
    element,
    onlyUnAuth = false
  }) {

  const location = useLocation();
  const { isAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) {
    return null; // Позже можно заменить на Loader
  }

  if (onlyUnAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return element;
}

export default ProtectedRoute;