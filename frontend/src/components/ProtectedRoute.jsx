import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

    const storedUser = localStorage.getItem("user");

    // User is not logged in
    if (!storedUser) {
        return <Navigate to="/login" replace />;
    }

    let user;

    try {
        user = JSON.parse(storedUser);
    } catch {
        localStorage.removeItem("user");
        return <Navigate to="/login" replace />;
    }

    const role = user?.role?.toUpperCase();

    // User has no valid role
    if (!role) {
        localStorage.removeItem("user");
        return <Navigate to="/login" replace />;
    }

    // User is logged in but doesn't have permission
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default ProtectedRoute;