import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth_context";
import LoadingSpinner from "../Components/LoadingSpinner";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);  // Destructure loading state
  if(loading){
    return <LoadingSpinner/>
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
