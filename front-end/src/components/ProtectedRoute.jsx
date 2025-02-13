/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isLogin }) => {
    return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
