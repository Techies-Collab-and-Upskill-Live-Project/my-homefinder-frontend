import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, loading, hasRole } = useAuth();

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

  // If not authenticated or no user data, render nothing
  if (!isAuthenticated || !user) {
    return null;
  }

  // If role is required but user doesn't have it
  if (requiredRole && !hasRole(requiredRole)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
