import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuth';

export const ProtectedAdminRoute = ({ children }) => {
    const { admin, setAdmin, loading } = useAdminAuth();
    const [ checkingAuth, setCheckingAuth ] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_ADMIN_URL}/me`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setAdmin(data.user);
                } else {
                    setAdmin(null);
                    // window.location.href = '/signin';
                }
            } catch (error) {
                console.error('Error fetching user:', error.message);
            } finally {
                setCheckingAuth(false);
            }
        };
        verifyAuth();
    }, [setAdmin]);

    if (loading || checkingAuth) {
        return <p>Loading...</p>;
    }

    if (!admin) {
        return <Navigate to="/admin/signin" />;
    }

    return children;
};