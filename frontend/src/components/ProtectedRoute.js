import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

export const ProtectedAccountRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export const ProtectedAdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to="/admin/signin" />;
    }

    return children;
};