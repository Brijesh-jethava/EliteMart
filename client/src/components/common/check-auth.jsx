import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation();
    const { pathname } = location;

    console.log(pathname, isAuthenticated);

    // Public routes for unauthenticated users
    const publicRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/verify-otp"];

    // Redirect unauthenticated users trying to access protected routes
    if (!isAuthenticated && !publicRoutes.some(route => pathname.includes(route))) {
        return <Navigate to="/auth/login" />;
    }

    // Prevent authenticated users from accessing login/register pages
    if (isAuthenticated && ["/auth/login", "/auth/register"].includes(pathname)) {
        return user?.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/shop/home" />;
    }

    // Prevent non-admin users from accessing admin routes
    if (isAuthenticated && user?.role !== 'admin' && pathname.startsWith("/admin")) {
        return <Navigate to="/unauth-page" />;
    }

    // Redirect admin users away from shop routes
    if (isAuthenticated && user?.role === 'admin' && pathname.startsWith("/shop")) {
        return <Navigate to="/admin/dashboard" />;
    }

    return <>{children}</>;
};

export default CheckAuth;
