import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../../context/useAuth.js";
import Loading from "../Loading/Loading.jsx";


function ProtectedRoute({
    element,
    onlyUnAuth = false
  }) {

  const location = useLocation();
  const { isAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <Loading />
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