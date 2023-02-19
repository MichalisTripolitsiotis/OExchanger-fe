// @ts-nocheck
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ token, authenticated, redirectPath = '/login', children }) => {
    if (!token || !authenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;