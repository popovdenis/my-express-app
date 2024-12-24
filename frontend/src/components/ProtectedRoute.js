import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const ProtectedAccountRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/signin" />;
    }

    return children;
};
const ProtectedAdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to="/admin/signin" />;
    }

    return children;
}

export {
    ProtectedAccountRoute,
    ProtectedAdminRoute
};