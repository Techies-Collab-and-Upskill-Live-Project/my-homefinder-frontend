import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, loading, user, hasRole } = useAuth();
  const location = useLocation();

  // Show loading while checking auth status
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

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/TenantLogin" state={{ from: location }} replace />;
  }

  // Check role if required
  if (requiredRole && !hasRole(requiredRole)) {
    // Redirect to appropriate page based on user's actual role
    if (user?.role === 'tenant') {
      return <Navigate to="/TenantProfile" replace />;
    } else if (user?.role === 'landlord') {
      return <Navigate to="/LandlordProfileB4Listing" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 