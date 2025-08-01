import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, loading, hasRole } = useAuth();
  const location = useLocation();

  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const user = authUser || null;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/tenantlogin" state={{ from: location }} replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    const roleName = user?.role?.name || user?.role;

    switch (roleName) {
      case "RENTER":
        return <Navigate to="/tenantlisting" replace />;
      case "LANDLORD":
        return <Navigate to="/landlordListing" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
