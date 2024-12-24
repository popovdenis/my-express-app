import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

export const ProtectedAccountRoute = ({ children }) => {
    const { user, setUser, loading } = useAuth();
    const [ checkingAuth, setCheckingAuth ] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/customer/account`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                    window.location.href = '/signin';
                }
            } catch (error) {
                // console.error('Error fetching user:', error.message);
            } finally {
                setCheckingAuth(false);
            }
        };
        verifyAuth();
    }, [setUser]);

    if (loading || checkingAuth) {
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